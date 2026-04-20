var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { K as ProtocolError, T as TimeoutWaitingForResponseErrorCode, N as utf8ToBytes, O as ExternalError, Q as MissingRootKeyErrorCode, R as Certificate, V as lookupResultToBuffer, W as RequestStatusResponseStatus, Y as UnknownError, Z as RequestStatusDoneNoReplyErrorCode, _ as RejectError, $ as CertifiedRejectErrorCode, a0 as UNREACHABLE_ERROR, a1 as InputError, a2 as InvalidReadStateRequestErrorCode, a3 as ReadRequestType, a4 as Principal, a5 as IDL, a6 as MissingCanisterIdErrorCode, a7 as HttpAgent, a8 as encode, a9 as QueryResponseStatus, aa as UncertifiedRejectErrorCode, ab as isV3ResponseBody, ac as isV2ResponseBody, ad as UncertifiedRejectUpdateErrorCode, ae as UnexpectedErrorCode, af as decode, w as Subscribable, ag as pendingThenable, ah as resolveEnabled, x as shallowEqualObjects, ai as resolveStaleTime, E as noop, aj as environmentManager, ak as isValidTimeout, al as timeUntilStale, am as timeoutManager, an as focusManager, ao as fetchState, ap as replaceData, D as notifyManager, r as reactExports, F as shouldThrowError, n as useQueryClient, v as useInternetIdentity, aq as createActorWithConfig, ar as Record, as as Vec, at as Variant, au as Opt, av as Service, aw as Func, ax as Text, ay as Int, az as Nat, aA as Tuple, aB as Principal$1, aC as Bool, aD as Float64, aE as Null, aF as Nat8 } from "./index-xECe6EUo.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const AdminExpense = Record({
  "id": Text,
  "date": Int,
  "createdBy": Text,
  "description": Text,
  "category": Text,
  "amount": Nat
});
const AddReviewInput = Record({
  "text": Text,
  "productId": Nat,
  "rating": Nat
});
const Review = Record({
  "id": Nat,
  "verified": Bool,
  "userId": Principal$1,
  "createdAt": Int,
  "text": Text,
  "productId": Nat,
  "approved": Bool,
  "rating": Nat
});
const TeamMember = Record({
  "id": Text,
  "permissions": Vec(Text),
  "active": Bool,
  "name": Text,
  "createdAt": Int,
  "role": Text,
  "email": Text
});
const UserRole = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const AdminCoupon = Record({
  "id": Text,
  "minCartValue": Nat,
  "active": Bool,
  "discountValue": Nat,
  "expiresAt": Opt(Int),
  "code": Text,
  "createdAt": Int,
  "discountType": Text,
  "usedCount": Nat,
  "description": Text,
  "maxUses": Nat
});
const AdminTask = Record({
  "id": Text,
  "title": Text,
  "assignedTo": Opt(Text),
  "createdAt": Int,
  "completed": Bool,
  "dueDate": Opt(Int),
  "description": Text,
  "notes": Text,
  "category": Text,
  "priority": Text
});
const BlogPost = Record({
  "id": Text,
  "metaDescription": Text,
  "status": Text,
  "title": Text,
  "content": Text,
  "publishDate": Opt(Int),
  "featuredImage": Text,
  "createdAt": Int,
  "slug": Text,
  "tags": Vec(Text),
  "updatedAt": Int,
  "metaTitle": Text,
  "excerpt": Text
});
const ShoppingItem = Record({
  "productName": Text,
  "currency": Text,
  "quantity": Nat,
  "priceInCents": Nat,
  "productDescription": Text
});
const CreateCouponInput = Record({
  "expiryDate": Int,
  "code": Text,
  "discountPercent": Nat,
  "maxUses": Nat
});
const Coupon = Record({
  "active": Bool,
  "expiryDate": Int,
  "code": Text,
  "usedCount": Nat,
  "discountPercent": Nat,
  "maxUses": Nat
});
const CreateFlashSaleInput = Record({
  "startTime": Int,
  "endTime": Int,
  "discountPercent": Nat,
  "productId": Nat
});
const FlashSale = Record({
  "id": Nat,
  "startTime": Int,
  "active": Bool,
  "endTime": Int,
  "discountPercent": Nat,
  "productId": Nat
});
const PaymentMethod = Variant({
  "cod": Null,
  "stripe": Null
});
const Address__1 = Record({
  "street": Text,
  "country": Text,
  "gstNumber": Opt(Text),
  "city": Text,
  "postalCode": Text,
  "state": Text
});
const CartItem = Record({
  "productId": Nat,
  "quantity": Nat,
  "price": Nat
});
const CreateOrderInput = Record({
  "couponCode": Opt(Text),
  "paymentMethod": PaymentMethod,
  "address": Address__1,
  "stripePaymentId": Opt(Text),
  "items": Vec(CartItem)
});
const OrderStatus = Variant({
  "shipped": Null,
  "cancelled": Null,
  "pending": Null,
  "delivered": Null,
  "processing": Null
});
const Order = Record({
  "id": Nat,
  "status": OrderStatus,
  "couponCode": Opt(Text),
  "paymentMethod": PaymentMethod,
  "userId": Principal$1,
  "discountAmount": Nat,
  "createdAt": Int,
  "totalAmount": Nat,
  "address": Address__1,
  "stripePaymentId": Opt(Text),
  "items": Vec(CartItem)
});
const Category = Text;
const CreateProductInput = Record({
  "featured": Bool,
  "bundleIds": Vec(Nat),
  "name": Text,
  "description": Text,
  "stock": Nat,
  "imageKey": Text,
  "imageUrl": Text,
  "discount": Nat,
  "category": Category,
  "price": Nat,
  "bestseller": Bool
});
const Product = Record({
  "id": Nat,
  "featured": Bool,
  "bundleIds": Vec(Nat),
  "name": Text,
  "ratings": Float64,
  "description": Text,
  "stock": Nat,
  "imageKey": Text,
  "imageUrl": Text,
  "discount": Nat,
  "category": Category,
  "price": Nat,
  "bestseller": Bool,
  "reviewCount": Nat
});
const AdminNotification = Record({
  "id": Text,
  "notificationType": Text,
  "createdAt": Int,
  "read": Bool,
  "message": Text
});
const AdminStats = Record({
  "totalProducts": Nat,
  "totalOrders": Nat,
  "totalRevenue": Nat
});
const ActivityType = Variant({
  "Login": Null,
  "WishlistRemove": Null,
  "CouponUsed": Null,
  "OrderPlaced": Null,
  "ProductView": Null,
  "Logout": Null,
  "NewsletterSignup": Null,
  "ProfileUpdated": Null,
  "CartAdd": Null,
  "SearchQuery": Null,
  "ReviewSubmitted": Null,
  "WishlistAdd": Null,
  "B2BInquiry": Null,
  "CartRemove": Null,
  "AddressAdded": Null
});
const UserActivity = Record({
  "id": Nat,
  "activityType": ActivityType,
  "metadata": Text,
  "userId": Principal$1,
  "timestamp": Int
});
const Address = Record({
  "tag": Text,
  "street": Text,
  "country": Text,
  "city": Text,
  "postalCode": Text,
  "state": Text,
  "isDefault": Bool
});
const UserProfile = Record({
  "id": Principal$1,
  "name": Text,
  "createdAt": Int,
  "email": Text,
  "addresses": Vec(Address),
  "phone": Text
});
const EnrichedCustomerProfile = Record({
  "id": Principal$1,
  "status": Text,
  "totalOrders": Nat,
  "name": Text,
  "createdAt": Int,
  "email": Text,
  "totalSpend": Nat,
  "phone": Text,
  "lastLogin": Opt(Int),
  "activityCount": Nat
});
const B2BInquiry = Record({
  "id": Nat,
  "contactName": Text,
  "createdAt": Int,
  "email": Text,
  "message": Text,
  "productInterest": Text,
  "companyName": Text,
  "quantity": Text,
  "phone": Text
});
const InventoryItem = Record({
  "supplierContact": Text,
  "lowStockThreshold": Nat,
  "purchaseCost": Nat,
  "expiryDate": Opt(Int),
  "supplierName": Text,
  "lastUpdated": Int,
  "productId": Text,
  "incomingStock": Nat,
  "reservedStock": Nat,
  "batchNumber": Text,
  "currentStock": Nat,
  "damagedStock": Nat
});
const ProductFilter = Record({
  "featured": Opt(Bool),
  "minRating": Opt(Float64),
  "sortBy": Opt(Text),
  "maxPrice": Opt(Nat),
  "category": Opt(Text),
  "minPrice": Opt(Nat),
  "searchQuery": Opt(Text)
});
const StoreSettings = Record({
  "timezone": Text,
  "gstNumber": Text,
  "freeShippingThreshold": Nat,
  "instagramUrl": Text,
  "whatsappNumber": Text,
  "currency": Text,
  "storeName": Text,
  "contactEmail": Text,
  "facebookUrl": Text,
  "contactPhone": Text
});
const StripeSessionStatus = Variant({
  "completed": Record({
    "userPrincipal": Opt(Text),
    "response": Text
  }),
  "failed": Record({ "error": Text })
});
const RegisterUserInput = Record({
  "name": Text,
  "email": Text,
  "phone": Text
});
const StripeConfiguration = Record({
  "allowedCountries": Vec(Text),
  "secretKey": Text
});
const B2BInquiryInput = Record({
  "contactName": Text,
  "email": Text,
  "message": Text,
  "productInterest": Text,
  "companyName": Text,
  "quantity": Text,
  "phone": Text
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const UpdateUserInput = Record({
  "name": Text,
  "email": Text,
  "addresses": Vec(Address),
  "phone": Text
});
const CouponValidation = Record({
  "valid": Bool,
  "discountPercent": Nat,
  "message": Text
});
Service({
  "_initializeAccessControl": Func([], [], []),
  "addExpense": Func([AdminExpense], [AdminExpense], []),
  "addReview": Func([AddReviewInput], [Review], []),
  "addTeamMember": Func([TeamMember], [TeamMember], []),
  "addToCart": Func([Nat, Nat, Nat], [], []),
  "addToWishlist": Func([Nat], [], []),
  "approveReview": Func([Nat], [Bool], []),
  "assignCallerUserRole": Func([Principal$1, UserRole], [], []),
  "cancelOrder": Func([Nat], [Bool], []),
  "clearAllNotifications": Func([], [], []),
  "clearCart": Func([], [], []),
  "completeAdminTask": Func([Text], [Bool], []),
  "createAdminCoupon": Func([AdminCoupon], [AdminCoupon], []),
  "createAdminTask": Func([AdminTask], [AdminTask], []),
  "createBlogPost": Func([BlogPost], [BlogPost], []),
  "createCheckoutSession": Func(
    [Vec(ShoppingItem), Text, Text],
    [Text],
    []
  ),
  "createCoupon": Func([CreateCouponInput], [Coupon], []),
  "createFlashSale": Func([CreateFlashSaleInput], [FlashSale], []),
  "createOrder": Func([CreateOrderInput], [Order], []),
  "createProduct": Func([CreateProductInput], [Product], []),
  "createReview": Func([AddReviewInput], [Review], []),
  "createTask": Func([AdminTask], [AdminTask], []),
  "deactivateFlashSale": Func([Nat], [Bool], []),
  "deleteAdminCoupon": Func([Text], [Bool], []),
  "deleteAdminTask": Func([Text], [Bool], []),
  "deleteBlogPost": Func([Text], [Bool], []),
  "deleteCoupon": Func([Text], [Bool], []),
  "deleteExpense": Func([Text], [Bool], []),
  "deleteProduct": Func([Nat], [Bool], []),
  "deleteTask": Func([Text], [Bool], []),
  "deleteTeamMember": Func([Text], [Bool], []),
  "endFlashSale": Func([Nat], [Bool], []),
  "getActiveFlashSales": Func([], [Vec(FlashSale)], ["query"]),
  "getAdminCoupons": Func([], [Vec(AdminCoupon)], ["query"]),
  "getAdminNotifications": Func(
    [],
    [Vec(AdminNotification)],
    ["query"]
  ),
  "getAdminStats": Func([], [AdminStats], ["query"]),
  "getAdminTasks": Func([], [Vec(AdminTask)], ["query"]),
  "getAllActivities": Func([], [Vec(UserActivity)], ["query"]),
  "getAllBlogPosts": Func([], [Vec(BlogPost)], ["query"]),
  "getAllCustomers": Func([], [Vec(UserProfile)], ["query"]),
  "getAllCustomersEnriched": Func(
    [],
    [Vec(EnrichedCustomerProfile)],
    ["query"]
  ),
  "getAllOrders": Func([], [Vec(Order)], ["query"]),
  "getAllReviews": Func([], [Vec(Review)], ["query"]),
  "getAnalytics": Func(
    [],
    [
      Record({
        "totalOrders": Nat,
        "totalActivities": Nat,
        "newUsersToday": Nat,
        "recentActivities": Vec(UserActivity),
        "activeUsersToday": Nat,
        "totalRegisteredUsers": Nat,
        "totalExpenses": Nat,
        "totalRevenue": Nat,
        "totalCustomers": Nat,
        "avgOrderValue": Nat,
        "netProfit": Int
      })
    ],
    ["query"]
  ),
  "getB2BInquiries": Func([], [Vec(B2BInquiry)], ["query"]),
  "getBlogPosts": Func([], [Vec(BlogPost)], ["query"]),
  "getCallerUserRole": Func([], [UserRole], ["query"]),
  "getCart": Func([], [Vec(CartItem)], ["query"]),
  "getCoupons": Func([], [Vec(Coupon)], ["query"]),
  "getCustomerProfile": Func(
    [Principal$1],
    [Opt(EnrichedCustomerProfile)],
    ["query"]
  ),
  "getExpenses": Func([], [Vec(AdminExpense)], ["query"]),
  "getExpensesByCategory": Func(
    [],
    [Vec(Tuple(Text, Nat))],
    ["query"]
  ),
  "getInventoryItems": Func([], [Vec(InventoryItem)], ["query"]),
  "getLowStockItems": Func([], [Vec(InventoryItem)], ["query"]),
  "getNewsletterSubscribers": Func([], [Vec(Text)], ["query"]),
  "getOrder": Func([Nat], [Opt(Order)], ["query"]),
  "getProduct": Func([Nat], [Opt(Product)], ["query"]),
  "getProductReviews": Func([Nat], [Vec(Review)], ["query"]),
  "getProducts": Func([ProductFilter], [Vec(Product)], ["query"]),
  "getRecommendations": Func([Text], [Vec(Product)], ["query"]),
  "getStoreSettings": Func([], [Opt(StoreSettings)], ["query"]),
  "getStripeSessionStatus": Func([Text], [StripeSessionStatus], []),
  "getTasks": Func([], [Vec(AdminTask)], ["query"]),
  "getTeamMembers": Func([], [Vec(TeamMember)], ["query"]),
  "getUserActivities": Func(
    [Opt(Principal$1)],
    [Vec(UserActivity)],
    ["query"]
  ),
  "getUserOrders": Func([], [Vec(Order)], ["query"]),
  "getUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getWishlist": Func([], [Vec(Nat)], ["query"]),
  "isAdmin": Func([], [Bool], ["query"]),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "isStripeConfigured": Func([], [Bool], ["query"]),
  "isWishlisted": Func([Nat], [Bool], ["query"]),
  "listAllOrders": Func([], [Vec(Order)], ["query"]),
  "listB2BInquiries": Func([], [Vec(B2BInquiry)], ["query"]),
  "listBundles": Func([], [Vec(Product)], ["query"]),
  "listEmails": Func([], [Vec(Text)], ["query"]),
  "listFeaturedProducts": Func([], [Vec(Product)], ["query"]),
  "listProducts": Func([ProductFilter], [Vec(Product)], ["query"]),
  "listUserOrders": Func([], [Vec(Order)], ["query"]),
  "logUserActivity": Func([ActivityType, Text], [UserActivity], []),
  "markNotificationRead": Func([Text], [Bool], []),
  "placeOrder": Func([CreateOrderInput], [Order], []),
  "publishBlogPost": Func([Text], [Bool], []),
  "redeemCoupon": Func([Text], [Bool], []),
  "registerUser": Func([RegisterUserInput], [UserProfile], []),
  "rejectReview": Func([Nat], [Bool], []),
  "removeFromCart": Func([Nat], [], []),
  "removeFromWishlist": Func([Nat], [], []),
  "removeTeamMember": Func([Text], [Bool], []),
  "saveStoreSettings": Func([StoreSettings], [StoreSettings], []),
  "seedProducts": Func([], [], []),
  "setStripeConfiguration": Func([StripeConfiguration], [], []),
  "setUserRole": Func([Principal$1, UserRole], [], []),
  "submitB2BInquiry": Func([B2BInquiryInput], [B2BInquiry], []),
  "subscribeEmail": Func([Text], [Bool], []),
  "subscribeNewsletter": Func([Text, Text], [Bool], []),
  "toggleBestseller": Func([Nat], [Bool], []),
  "toggleCouponActive": Func([Text], [Bool], []),
  "toggleFeatured": Func([Nat], [Bool], []),
  "transform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "updateAdminCoupon": Func(
    [Text, AdminCoupon],
    [Opt(AdminCoupon)],
    []
  ),
  "updateAdminTask": Func([Text, AdminTask], [Opt(AdminTask)], []),
  "updateBlogPost": Func([Text, BlogPost], [Opt(BlogPost)], []),
  "updateCartQuantity": Func([Nat, Nat], [], []),
  "updateExpense": Func(
    [Text, AdminExpense],
    [Opt(AdminExpense)],
    []
  ),
  "updateInventory": Func(
    [Text, Int, Text, Text],
    [Opt(InventoryItem)],
    []
  ),
  "updateInventoryStock": Func(
    [Text, Int, Text],
    [Opt(InventoryItem)],
    []
  ),
  "updateOrderStatus": Func([Nat, OrderStatus], [Bool], []),
  "updateProduct": Func([Nat, CreateProductInput], [Bool], []),
  "updateStoreSettings": Func([StoreSettings], [StoreSettings], []),
  "updateTask": Func([Text, AdminTask], [Opt(AdminTask)], []),
  "updateTeamMember": Func(
    [Text, TeamMember],
    [Opt(TeamMember)],
    []
  ),
  "updateUserProfile": Func([UpdateUserInput], [Opt(UserProfile)], []),
  "upsertInventoryItem": Func([InventoryItem], [InventoryItem], []),
  "validateCoupon": Func([Text], [CouponValidation], ["query"]),
  "verifyAdminCredentials": Func([Text, Text], [Bool], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const AdminExpense2 = IDL2.Record({
    "id": IDL2.Text,
    "date": IDL2.Int,
    "createdBy": IDL2.Text,
    "description": IDL2.Text,
    "category": IDL2.Text,
    "amount": IDL2.Nat
  });
  const AddReviewInput2 = IDL2.Record({
    "text": IDL2.Text,
    "productId": IDL2.Nat,
    "rating": IDL2.Nat
  });
  const Review2 = IDL2.Record({
    "id": IDL2.Nat,
    "verified": IDL2.Bool,
    "userId": IDL2.Principal,
    "createdAt": IDL2.Int,
    "text": IDL2.Text,
    "productId": IDL2.Nat,
    "approved": IDL2.Bool,
    "rating": IDL2.Nat
  });
  const TeamMember2 = IDL2.Record({
    "id": IDL2.Text,
    "permissions": IDL2.Vec(IDL2.Text),
    "active": IDL2.Bool,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "role": IDL2.Text,
    "email": IDL2.Text
  });
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const AdminCoupon2 = IDL2.Record({
    "id": IDL2.Text,
    "minCartValue": IDL2.Nat,
    "active": IDL2.Bool,
    "discountValue": IDL2.Nat,
    "expiresAt": IDL2.Opt(IDL2.Int),
    "code": IDL2.Text,
    "createdAt": IDL2.Int,
    "discountType": IDL2.Text,
    "usedCount": IDL2.Nat,
    "description": IDL2.Text,
    "maxUses": IDL2.Nat
  });
  const AdminTask2 = IDL2.Record({
    "id": IDL2.Text,
    "title": IDL2.Text,
    "assignedTo": IDL2.Opt(IDL2.Text),
    "createdAt": IDL2.Int,
    "completed": IDL2.Bool,
    "dueDate": IDL2.Opt(IDL2.Int),
    "description": IDL2.Text,
    "notes": IDL2.Text,
    "category": IDL2.Text,
    "priority": IDL2.Text
  });
  const BlogPost2 = IDL2.Record({
    "id": IDL2.Text,
    "metaDescription": IDL2.Text,
    "status": IDL2.Text,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "publishDate": IDL2.Opt(IDL2.Int),
    "featuredImage": IDL2.Text,
    "createdAt": IDL2.Int,
    "slug": IDL2.Text,
    "tags": IDL2.Vec(IDL2.Text),
    "updatedAt": IDL2.Int,
    "metaTitle": IDL2.Text,
    "excerpt": IDL2.Text
  });
  const ShoppingItem2 = IDL2.Record({
    "productName": IDL2.Text,
    "currency": IDL2.Text,
    "quantity": IDL2.Nat,
    "priceInCents": IDL2.Nat,
    "productDescription": IDL2.Text
  });
  const CreateCouponInput2 = IDL2.Record({
    "expiryDate": IDL2.Int,
    "code": IDL2.Text,
    "discountPercent": IDL2.Nat,
    "maxUses": IDL2.Nat
  });
  const Coupon2 = IDL2.Record({
    "active": IDL2.Bool,
    "expiryDate": IDL2.Int,
    "code": IDL2.Text,
    "usedCount": IDL2.Nat,
    "discountPercent": IDL2.Nat,
    "maxUses": IDL2.Nat
  });
  const CreateFlashSaleInput2 = IDL2.Record({
    "startTime": IDL2.Int,
    "endTime": IDL2.Int,
    "discountPercent": IDL2.Nat,
    "productId": IDL2.Nat
  });
  const FlashSale2 = IDL2.Record({
    "id": IDL2.Nat,
    "startTime": IDL2.Int,
    "active": IDL2.Bool,
    "endTime": IDL2.Int,
    "discountPercent": IDL2.Nat,
    "productId": IDL2.Nat
  });
  const PaymentMethod2 = IDL2.Variant({ "cod": IDL2.Null, "stripe": IDL2.Null });
  const Address__12 = IDL2.Record({
    "street": IDL2.Text,
    "country": IDL2.Text,
    "gstNumber": IDL2.Opt(IDL2.Text),
    "city": IDL2.Text,
    "postalCode": IDL2.Text,
    "state": IDL2.Text
  });
  const CartItem2 = IDL2.Record({
    "productId": IDL2.Nat,
    "quantity": IDL2.Nat,
    "price": IDL2.Nat
  });
  const CreateOrderInput2 = IDL2.Record({
    "couponCode": IDL2.Opt(IDL2.Text),
    "paymentMethod": PaymentMethod2,
    "address": Address__12,
    "stripePaymentId": IDL2.Opt(IDL2.Text),
    "items": IDL2.Vec(CartItem2)
  });
  const OrderStatus2 = IDL2.Variant({
    "shipped": IDL2.Null,
    "cancelled": IDL2.Null,
    "pending": IDL2.Null,
    "delivered": IDL2.Null,
    "processing": IDL2.Null
  });
  const Order2 = IDL2.Record({
    "id": IDL2.Nat,
    "status": OrderStatus2,
    "couponCode": IDL2.Opt(IDL2.Text),
    "paymentMethod": PaymentMethod2,
    "userId": IDL2.Principal,
    "discountAmount": IDL2.Nat,
    "createdAt": IDL2.Int,
    "totalAmount": IDL2.Nat,
    "address": Address__12,
    "stripePaymentId": IDL2.Opt(IDL2.Text),
    "items": IDL2.Vec(CartItem2)
  });
  const Category2 = IDL2.Text;
  const CreateProductInput2 = IDL2.Record({
    "featured": IDL2.Bool,
    "bundleIds": IDL2.Vec(IDL2.Nat),
    "name": IDL2.Text,
    "description": IDL2.Text,
    "stock": IDL2.Nat,
    "imageKey": IDL2.Text,
    "imageUrl": IDL2.Text,
    "discount": IDL2.Nat,
    "category": Category2,
    "price": IDL2.Nat,
    "bestseller": IDL2.Bool
  });
  const Product2 = IDL2.Record({
    "id": IDL2.Nat,
    "featured": IDL2.Bool,
    "bundleIds": IDL2.Vec(IDL2.Nat),
    "name": IDL2.Text,
    "ratings": IDL2.Float64,
    "description": IDL2.Text,
    "stock": IDL2.Nat,
    "imageKey": IDL2.Text,
    "imageUrl": IDL2.Text,
    "discount": IDL2.Nat,
    "category": Category2,
    "price": IDL2.Nat,
    "bestseller": IDL2.Bool,
    "reviewCount": IDL2.Nat
  });
  const AdminNotification2 = IDL2.Record({
    "id": IDL2.Text,
    "notificationType": IDL2.Text,
    "createdAt": IDL2.Int,
    "read": IDL2.Bool,
    "message": IDL2.Text
  });
  const AdminStats2 = IDL2.Record({
    "totalProducts": IDL2.Nat,
    "totalOrders": IDL2.Nat,
    "totalRevenue": IDL2.Nat
  });
  const ActivityType2 = IDL2.Variant({
    "Login": IDL2.Null,
    "WishlistRemove": IDL2.Null,
    "CouponUsed": IDL2.Null,
    "OrderPlaced": IDL2.Null,
    "ProductView": IDL2.Null,
    "Logout": IDL2.Null,
    "NewsletterSignup": IDL2.Null,
    "ProfileUpdated": IDL2.Null,
    "CartAdd": IDL2.Null,
    "SearchQuery": IDL2.Null,
    "ReviewSubmitted": IDL2.Null,
    "WishlistAdd": IDL2.Null,
    "B2BInquiry": IDL2.Null,
    "CartRemove": IDL2.Null,
    "AddressAdded": IDL2.Null
  });
  const UserActivity2 = IDL2.Record({
    "id": IDL2.Nat,
    "activityType": ActivityType2,
    "metadata": IDL2.Text,
    "userId": IDL2.Principal,
    "timestamp": IDL2.Int
  });
  const Address2 = IDL2.Record({
    "tag": IDL2.Text,
    "street": IDL2.Text,
    "country": IDL2.Text,
    "city": IDL2.Text,
    "postalCode": IDL2.Text,
    "state": IDL2.Text,
    "isDefault": IDL2.Bool
  });
  const UserProfile2 = IDL2.Record({
    "id": IDL2.Principal,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "email": IDL2.Text,
    "addresses": IDL2.Vec(Address2),
    "phone": IDL2.Text
  });
  const EnrichedCustomerProfile2 = IDL2.Record({
    "id": IDL2.Principal,
    "status": IDL2.Text,
    "totalOrders": IDL2.Nat,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "email": IDL2.Text,
    "totalSpend": IDL2.Nat,
    "phone": IDL2.Text,
    "lastLogin": IDL2.Opt(IDL2.Int),
    "activityCount": IDL2.Nat
  });
  const B2BInquiry2 = IDL2.Record({
    "id": IDL2.Nat,
    "contactName": IDL2.Text,
    "createdAt": IDL2.Int,
    "email": IDL2.Text,
    "message": IDL2.Text,
    "productInterest": IDL2.Text,
    "companyName": IDL2.Text,
    "quantity": IDL2.Text,
    "phone": IDL2.Text
  });
  const InventoryItem2 = IDL2.Record({
    "supplierContact": IDL2.Text,
    "lowStockThreshold": IDL2.Nat,
    "purchaseCost": IDL2.Nat,
    "expiryDate": IDL2.Opt(IDL2.Int),
    "supplierName": IDL2.Text,
    "lastUpdated": IDL2.Int,
    "productId": IDL2.Text,
    "incomingStock": IDL2.Nat,
    "reservedStock": IDL2.Nat,
    "batchNumber": IDL2.Text,
    "currentStock": IDL2.Nat,
    "damagedStock": IDL2.Nat
  });
  const ProductFilter2 = IDL2.Record({
    "featured": IDL2.Opt(IDL2.Bool),
    "minRating": IDL2.Opt(IDL2.Float64),
    "sortBy": IDL2.Opt(IDL2.Text),
    "maxPrice": IDL2.Opt(IDL2.Nat),
    "category": IDL2.Opt(IDL2.Text),
    "minPrice": IDL2.Opt(IDL2.Nat),
    "searchQuery": IDL2.Opt(IDL2.Text)
  });
  const StoreSettings2 = IDL2.Record({
    "timezone": IDL2.Text,
    "gstNumber": IDL2.Text,
    "freeShippingThreshold": IDL2.Nat,
    "instagramUrl": IDL2.Text,
    "whatsappNumber": IDL2.Text,
    "currency": IDL2.Text,
    "storeName": IDL2.Text,
    "contactEmail": IDL2.Text,
    "facebookUrl": IDL2.Text,
    "contactPhone": IDL2.Text
  });
  const StripeSessionStatus2 = IDL2.Variant({
    "completed": IDL2.Record({
      "userPrincipal": IDL2.Opt(IDL2.Text),
      "response": IDL2.Text
    }),
    "failed": IDL2.Record({ "error": IDL2.Text })
  });
  const RegisterUserInput2 = IDL2.Record({
    "name": IDL2.Text,
    "email": IDL2.Text,
    "phone": IDL2.Text
  });
  const StripeConfiguration2 = IDL2.Record({
    "allowedCountries": IDL2.Vec(IDL2.Text),
    "secretKey": IDL2.Text
  });
  const B2BInquiryInput2 = IDL2.Record({
    "contactName": IDL2.Text,
    "email": IDL2.Text,
    "message": IDL2.Text,
    "productInterest": IDL2.Text,
    "companyName": IDL2.Text,
    "quantity": IDL2.Text,
    "phone": IDL2.Text
  });
  const http_header2 = IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text });
  const http_request_result2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const TransformationInput2 = IDL2.Record({
    "context": IDL2.Vec(IDL2.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const UpdateUserInput2 = IDL2.Record({
    "name": IDL2.Text,
    "email": IDL2.Text,
    "addresses": IDL2.Vec(Address2),
    "phone": IDL2.Text
  });
  const CouponValidation2 = IDL2.Record({
    "valid": IDL2.Bool,
    "discountPercent": IDL2.Nat,
    "message": IDL2.Text
  });
  return IDL2.Service({
    "_initializeAccessControl": IDL2.Func([], [], []),
    "addExpense": IDL2.Func([AdminExpense2], [AdminExpense2], []),
    "addReview": IDL2.Func([AddReviewInput2], [Review2], []),
    "addTeamMember": IDL2.Func([TeamMember2], [TeamMember2], []),
    "addToCart": IDL2.Func([IDL2.Nat, IDL2.Nat, IDL2.Nat], [], []),
    "addToWishlist": IDL2.Func([IDL2.Nat], [], []),
    "approveReview": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "cancelOrder": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "clearAllNotifications": IDL2.Func([], [], []),
    "clearCart": IDL2.Func([], [], []),
    "completeAdminTask": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "createAdminCoupon": IDL2.Func([AdminCoupon2], [AdminCoupon2], []),
    "createAdminTask": IDL2.Func([AdminTask2], [AdminTask2], []),
    "createBlogPost": IDL2.Func([BlogPost2], [BlogPost2], []),
    "createCheckoutSession": IDL2.Func(
      [IDL2.Vec(ShoppingItem2), IDL2.Text, IDL2.Text],
      [IDL2.Text],
      []
    ),
    "createCoupon": IDL2.Func([CreateCouponInput2], [Coupon2], []),
    "createFlashSale": IDL2.Func([CreateFlashSaleInput2], [FlashSale2], []),
    "createOrder": IDL2.Func([CreateOrderInput2], [Order2], []),
    "createProduct": IDL2.Func([CreateProductInput2], [Product2], []),
    "createReview": IDL2.Func([AddReviewInput2], [Review2], []),
    "createTask": IDL2.Func([AdminTask2], [AdminTask2], []),
    "deactivateFlashSale": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "deleteAdminCoupon": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteAdminTask": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteBlogPost": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteCoupon": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteExpense": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteProduct": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "deleteTask": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteTeamMember": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "endFlashSale": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "getActiveFlashSales": IDL2.Func([], [IDL2.Vec(FlashSale2)], ["query"]),
    "getAdminCoupons": IDL2.Func([], [IDL2.Vec(AdminCoupon2)], ["query"]),
    "getAdminNotifications": IDL2.Func(
      [],
      [IDL2.Vec(AdminNotification2)],
      ["query"]
    ),
    "getAdminStats": IDL2.Func([], [AdminStats2], ["query"]),
    "getAdminTasks": IDL2.Func([], [IDL2.Vec(AdminTask2)], ["query"]),
    "getAllActivities": IDL2.Func([], [IDL2.Vec(UserActivity2)], ["query"]),
    "getAllBlogPosts": IDL2.Func([], [IDL2.Vec(BlogPost2)], ["query"]),
    "getAllCustomers": IDL2.Func([], [IDL2.Vec(UserProfile2)], ["query"]),
    "getAllCustomersEnriched": IDL2.Func(
      [],
      [IDL2.Vec(EnrichedCustomerProfile2)],
      ["query"]
    ),
    "getAllOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "getAllReviews": IDL2.Func([], [IDL2.Vec(Review2)], ["query"]),
    "getAnalytics": IDL2.Func(
      [],
      [
        IDL2.Record({
          "totalOrders": IDL2.Nat,
          "totalActivities": IDL2.Nat,
          "newUsersToday": IDL2.Nat,
          "recentActivities": IDL2.Vec(UserActivity2),
          "activeUsersToday": IDL2.Nat,
          "totalRegisteredUsers": IDL2.Nat,
          "totalExpenses": IDL2.Nat,
          "totalRevenue": IDL2.Nat,
          "totalCustomers": IDL2.Nat,
          "avgOrderValue": IDL2.Nat,
          "netProfit": IDL2.Int
        })
      ],
      ["query"]
    ),
    "getB2BInquiries": IDL2.Func([], [IDL2.Vec(B2BInquiry2)], ["query"]),
    "getBlogPosts": IDL2.Func([], [IDL2.Vec(BlogPost2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getCart": IDL2.Func([], [IDL2.Vec(CartItem2)], ["query"]),
    "getCoupons": IDL2.Func([], [IDL2.Vec(Coupon2)], ["query"]),
    "getCustomerProfile": IDL2.Func(
      [IDL2.Principal],
      [IDL2.Opt(EnrichedCustomerProfile2)],
      ["query"]
    ),
    "getExpenses": IDL2.Func([], [IDL2.Vec(AdminExpense2)], ["query"]),
    "getExpensesByCategory": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Nat))],
      ["query"]
    ),
    "getInventoryItems": IDL2.Func([], [IDL2.Vec(InventoryItem2)], ["query"]),
    "getLowStockItems": IDL2.Func([], [IDL2.Vec(InventoryItem2)], ["query"]),
    "getNewsletterSubscribers": IDL2.Func([], [IDL2.Vec(IDL2.Text)], ["query"]),
    "getOrder": IDL2.Func([IDL2.Nat], [IDL2.Opt(Order2)], ["query"]),
    "getProduct": IDL2.Func([IDL2.Nat], [IDL2.Opt(Product2)], ["query"]),
    "getProductReviews": IDL2.Func([IDL2.Nat], [IDL2.Vec(Review2)], ["query"]),
    "getProducts": IDL2.Func([ProductFilter2], [IDL2.Vec(Product2)], ["query"]),
    "getRecommendations": IDL2.Func([IDL2.Text], [IDL2.Vec(Product2)], ["query"]),
    "getStoreSettings": IDL2.Func([], [IDL2.Opt(StoreSettings2)], ["query"]),
    "getStripeSessionStatus": IDL2.Func([IDL2.Text], [StripeSessionStatus2], []),
    "getTasks": IDL2.Func([], [IDL2.Vec(AdminTask2)], ["query"]),
    "getTeamMembers": IDL2.Func([], [IDL2.Vec(TeamMember2)], ["query"]),
    "getUserActivities": IDL2.Func(
      [IDL2.Opt(IDL2.Principal)],
      [IDL2.Vec(UserActivity2)],
      ["query"]
    ),
    "getUserOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "getUserProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getWishlist": IDL2.Func([], [IDL2.Vec(IDL2.Nat)], ["query"]),
    "isAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isStripeConfigured": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isWishlisted": IDL2.Func([IDL2.Nat], [IDL2.Bool], ["query"]),
    "listAllOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "listB2BInquiries": IDL2.Func([], [IDL2.Vec(B2BInquiry2)], ["query"]),
    "listBundles": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "listEmails": IDL2.Func([], [IDL2.Vec(IDL2.Text)], ["query"]),
    "listFeaturedProducts": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "listProducts": IDL2.Func([ProductFilter2], [IDL2.Vec(Product2)], ["query"]),
    "listUserOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "logUserActivity": IDL2.Func([ActivityType2, IDL2.Text], [UserActivity2], []),
    "markNotificationRead": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "placeOrder": IDL2.Func([CreateOrderInput2], [Order2], []),
    "publishBlogPost": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "redeemCoupon": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "registerUser": IDL2.Func([RegisterUserInput2], [UserProfile2], []),
    "rejectReview": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "removeFromCart": IDL2.Func([IDL2.Nat], [], []),
    "removeFromWishlist": IDL2.Func([IDL2.Nat], [], []),
    "removeTeamMember": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "saveStoreSettings": IDL2.Func([StoreSettings2], [StoreSettings2], []),
    "seedProducts": IDL2.Func([], [], []),
    "setStripeConfiguration": IDL2.Func([StripeConfiguration2], [], []),
    "setUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "submitB2BInquiry": IDL2.Func([B2BInquiryInput2], [B2BInquiry2], []),
    "subscribeEmail": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "subscribeNewsletter": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Bool], []),
    "toggleBestseller": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "toggleCouponActive": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "toggleFeatured": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "transform": IDL2.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "updateAdminCoupon": IDL2.Func(
      [IDL2.Text, AdminCoupon2],
      [IDL2.Opt(AdminCoupon2)],
      []
    ),
    "updateAdminTask": IDL2.Func(
      [IDL2.Text, AdminTask2],
      [IDL2.Opt(AdminTask2)],
      []
    ),
    "updateBlogPost": IDL2.Func([IDL2.Text, BlogPost2], [IDL2.Opt(BlogPost2)], []),
    "updateCartQuantity": IDL2.Func([IDL2.Nat, IDL2.Nat], [], []),
    "updateExpense": IDL2.Func(
      [IDL2.Text, AdminExpense2],
      [IDL2.Opt(AdminExpense2)],
      []
    ),
    "updateInventory": IDL2.Func(
      [IDL2.Text, IDL2.Int, IDL2.Text, IDL2.Text],
      [IDL2.Opt(InventoryItem2)],
      []
    ),
    "updateInventoryStock": IDL2.Func(
      [IDL2.Text, IDL2.Int, IDL2.Text],
      [IDL2.Opt(InventoryItem2)],
      []
    ),
    "updateOrderStatus": IDL2.Func([IDL2.Nat, OrderStatus2], [IDL2.Bool], []),
    "updateProduct": IDL2.Func([IDL2.Nat, CreateProductInput2], [IDL2.Bool], []),
    "updateStoreSettings": IDL2.Func([StoreSettings2], [StoreSettings2], []),
    "updateTask": IDL2.Func([IDL2.Text, AdminTask2], [IDL2.Opt(AdminTask2)], []),
    "updateTeamMember": IDL2.Func(
      [IDL2.Text, TeamMember2],
      [IDL2.Opt(TeamMember2)],
      []
    ),
    "updateUserProfile": IDL2.Func(
      [UpdateUserInput2],
      [IDL2.Opt(UserProfile2)],
      []
    ),
    "upsertInventoryItem": IDL2.Func([InventoryItem2], [InventoryItem2], []),
    "validateCoupon": IDL2.Func([IDL2.Text], [CouponValidation2], ["query"]),
    "verifyAdminCredentials": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Bool], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async addExpense(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addExpense(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addExpense(arg0);
      return result;
    }
  }
  async addReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addReview(arg0);
      return result;
    }
  }
  async addTeamMember(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addTeamMember(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addTeamMember(arg0);
      return result;
    }
  }
  async addToCart(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.addToCart(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addToCart(arg0, arg1, arg2);
      return result;
    }
  }
  async addToWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addToWishlist(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addToWishlist(arg0);
      return result;
    }
  }
  async approveReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.approveReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.approveReview(arg0);
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async cancelOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.cancelOrder(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.cancelOrder(arg0);
      return result;
    }
  }
  async clearAllNotifications() {
    if (this.processError) {
      try {
        const result = await this.actor.clearAllNotifications();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.clearAllNotifications();
      return result;
    }
  }
  async clearCart() {
    if (this.processError) {
      try {
        const result = await this.actor.clearCart();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.clearCart();
      return result;
    }
  }
  async completeAdminTask(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.completeAdminTask(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.completeAdminTask(arg0);
      return result;
    }
  }
  async createAdminCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createAdminCoupon(to_candid_AdminCoupon_n3(this._uploadFile, this._downloadFile, arg0));
        return from_candid_AdminCoupon_n5(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createAdminCoupon(to_candid_AdminCoupon_n3(this._uploadFile, this._downloadFile, arg0));
      return from_candid_AdminCoupon_n5(this._uploadFile, this._downloadFile, result);
    }
  }
  async createAdminTask(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createAdminTask(to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg0));
        return from_candid_AdminTask_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createAdminTask(to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg0));
      return from_candid_AdminTask_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async createBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createBlogPost(to_candid_BlogPost_n13(this._uploadFile, this._downloadFile, arg0));
        return from_candid_BlogPost_n15(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createBlogPost(to_candid_BlogPost_n13(this._uploadFile, this._downloadFile, arg0));
      return from_candid_BlogPost_n15(this._uploadFile, this._downloadFile, result);
    }
  }
  async createCheckoutSession(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
      return result;
    }
  }
  async createCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCoupon(arg0);
      return result;
    }
  }
  async createFlashSale(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createFlashSale(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createFlashSale(arg0);
      return result;
    }
  }
  async createOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createOrder(to_candid_CreateOrderInput_n17(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Order_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createOrder(to_candid_CreateOrderInput_n17(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Order_n23(this._uploadFile, this._downloadFile, result);
    }
  }
  async createProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createProduct(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createProduct(arg0);
      return result;
    }
  }
  async createReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createReview(arg0);
      return result;
    }
  }
  async createTask(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createTask(to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg0));
        return from_candid_AdminTask_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createTask(to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg0));
      return from_candid_AdminTask_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async deactivateFlashSale(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deactivateFlashSale(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deactivateFlashSale(arg0);
      return result;
    }
  }
  async deleteAdminCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteAdminCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteAdminCoupon(arg0);
      return result;
    }
  }
  async deleteAdminTask(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteAdminTask(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteAdminTask(arg0);
      return result;
    }
  }
  async deleteBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteBlogPost(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteBlogPost(arg0);
      return result;
    }
  }
  async deleteCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCoupon(arg0);
      return result;
    }
  }
  async deleteExpense(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteExpense(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteExpense(arg0);
      return result;
    }
  }
  async deleteProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteProduct(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteProduct(arg0);
      return result;
    }
  }
  async deleteTask(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteTask(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteTask(arg0);
      return result;
    }
  }
  async deleteTeamMember(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteTeamMember(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteTeamMember(arg0);
      return result;
    }
  }
  async endFlashSale(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.endFlashSale(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.endFlashSale(arg0);
      return result;
    }
  }
  async getActiveFlashSales() {
    if (this.processError) {
      try {
        const result = await this.actor.getActiveFlashSales();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getActiveFlashSales();
      return result;
    }
  }
  async getAdminCoupons() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminCoupons();
        return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminCoupons();
      return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAdminNotifications() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminNotifications();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminNotifications();
      return result;
    }
  }
  async getAdminStats() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminStats();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminStats();
      return result;
    }
  }
  async getAdminTasks() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminTasks();
        return from_candid_vec_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminTasks();
      return from_candid_vec_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllActivities() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllActivities();
        return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllActivities();
      return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllBlogPosts();
        return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllBlogPosts();
      return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllCustomers() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllCustomers();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllCustomers();
      return result;
    }
  }
  async getAllCustomersEnriched() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllCustomersEnriched();
        return from_candid_vec_n39(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllCustomersEnriched();
      return from_candid_vec_n39(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllOrders();
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllOrders();
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllReviews() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllReviews();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllReviews();
      return result;
    }
  }
  async getAnalytics() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnalytics();
        return from_candid_record_n43(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnalytics();
      return from_candid_record_n43(this._uploadFile, this._downloadFile, result);
    }
  }
  async getB2BInquiries() {
    if (this.processError) {
      try {
        const result = await this.actor.getB2BInquiries();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getB2BInquiries();
      return result;
    }
  }
  async getBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPosts();
        return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPosts();
      return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n44(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n44(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCart() {
    if (this.processError) {
      try {
        const result = await this.actor.getCart();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCart();
      return result;
    }
  }
  async getCoupons() {
    if (this.processError) {
      try {
        const result = await this.actor.getCoupons();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCoupons();
      return result;
    }
  }
  async getCustomerProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getCustomerProfile(arg0);
        return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCustomerProfile(arg0);
      return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
    }
  }
  async getExpenses() {
    if (this.processError) {
      try {
        const result = await this.actor.getExpenses();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getExpenses();
      return result;
    }
  }
  async getExpensesByCategory() {
    if (this.processError) {
      try {
        const result = await this.actor.getExpensesByCategory();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getExpensesByCategory();
      return result;
    }
  }
  async getInventoryItems() {
    if (this.processError) {
      try {
        const result = await this.actor.getInventoryItems();
        return from_candid_vec_n47(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getInventoryItems();
      return from_candid_vec_n47(this._uploadFile, this._downloadFile, result);
    }
  }
  async getLowStockItems() {
    if (this.processError) {
      try {
        const result = await this.actor.getLowStockItems();
        return from_candid_vec_n47(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLowStockItems();
      return from_candid_vec_n47(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNewsletterSubscribers() {
    if (this.processError) {
      try {
        const result = await this.actor.getNewsletterSubscribers();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNewsletterSubscribers();
      return result;
    }
  }
  async getOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getOrder(arg0);
        return from_candid_opt_n50(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOrder(arg0);
      return from_candid_opt_n50(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProduct(arg0);
        return from_candid_opt_n51(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProduct(arg0);
      return from_candid_opt_n51(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProductReviews(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductReviews(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductReviews(arg0);
      return result;
    }
  }
  async getProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProducts(to_candid_ProductFilter_n52(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProducts(to_candid_ProductFilter_n52(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async getRecommendations(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRecommendations(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRecommendations(arg0);
      return result;
    }
  }
  async getStoreSettings() {
    if (this.processError) {
      try {
        const result = await this.actor.getStoreSettings();
        return from_candid_opt_n54(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStoreSettings();
      return from_candid_opt_n54(this._uploadFile, this._downloadFile, result);
    }
  }
  async getStripeSessionStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStripeSessionStatus(arg0);
        return from_candid_StripeSessionStatus_n55(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStripeSessionStatus(arg0);
      return from_candid_StripeSessionStatus_n55(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTasks() {
    if (this.processError) {
      try {
        const result = await this.actor.getTasks();
        return from_candid_vec_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTasks();
      return from_candid_vec_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTeamMembers() {
    if (this.processError) {
      try {
        const result = await this.actor.getTeamMembers();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTeamMembers();
      return result;
    }
  }
  async getUserActivities(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserActivities(to_candid_opt_n58(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserActivities(to_candid_opt_n58(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.getUserOrders();
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserOrders();
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile();
        return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile();
      return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async getWishlist() {
    if (this.processError) {
      try {
        const result = await this.actor.getWishlist();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWishlist();
      return result;
    }
  }
  async isAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isAdmin();
      return result;
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async isStripeConfigured() {
    if (this.processError) {
      try {
        const result = await this.actor.isStripeConfigured();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isStripeConfigured();
      return result;
    }
  }
  async isWishlisted(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.isWishlisted(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isWishlisted(arg0);
      return result;
    }
  }
  async listAllOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.listAllOrders();
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listAllOrders();
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async listB2BInquiries() {
    if (this.processError) {
      try {
        const result = await this.actor.listB2BInquiries();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listB2BInquiries();
      return result;
    }
  }
  async listBundles() {
    if (this.processError) {
      try {
        const result = await this.actor.listBundles();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listBundles();
      return result;
    }
  }
  async listEmails() {
    if (this.processError) {
      try {
        const result = await this.actor.listEmails();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listEmails();
      return result;
    }
  }
  async listFeaturedProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.listFeaturedProducts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listFeaturedProducts();
      return result;
    }
  }
  async listProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listProducts(to_candid_ProductFilter_n52(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listProducts(to_candid_ProductFilter_n52(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async listUserOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.listUserOrders();
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listUserOrders();
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async logUserActivity(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.logUserActivity(to_candid_ActivityType_n60(this._uploadFile, this._downloadFile, arg0), arg1);
        return from_candid_UserActivity_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.logUserActivity(to_candid_ActivityType_n60(this._uploadFile, this._downloadFile, arg0), arg1);
      return from_candid_UserActivity_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async markNotificationRead(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.markNotificationRead(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.markNotificationRead(arg0);
      return result;
    }
  }
  async placeOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.placeOrder(to_candid_CreateOrderInput_n17(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Order_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.placeOrder(to_candid_CreateOrderInput_n17(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Order_n23(this._uploadFile, this._downloadFile, result);
    }
  }
  async publishBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.publishBlogPost(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.publishBlogPost(arg0);
      return result;
    }
  }
  async redeemCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.redeemCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.redeemCoupon(arg0);
      return result;
    }
  }
  async registerUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.registerUser(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.registerUser(arg0);
      return result;
    }
  }
  async rejectReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.rejectReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.rejectReview(arg0);
      return result;
    }
  }
  async removeFromCart(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeFromCart(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeFromCart(arg0);
      return result;
    }
  }
  async removeFromWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeFromWishlist(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeFromWishlist(arg0);
      return result;
    }
  }
  async removeTeamMember(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeTeamMember(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeTeamMember(arg0);
      return result;
    }
  }
  async saveStoreSettings(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveStoreSettings(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveStoreSettings(arg0);
      return result;
    }
  }
  async seedProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.seedProducts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedProducts();
      return result;
    }
  }
  async setStripeConfiguration(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setStripeConfiguration(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setStripeConfiguration(arg0);
      return result;
    }
  }
  async setUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setUserRole(arg0, to_candid_UserRole_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setUserRole(arg0, to_candid_UserRole_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async submitB2BInquiry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.submitB2BInquiry(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitB2BInquiry(arg0);
      return result;
    }
  }
  async subscribeEmail(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.subscribeEmail(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.subscribeEmail(arg0);
      return result;
    }
  }
  async subscribeNewsletter(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.subscribeNewsletter(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.subscribeNewsletter(arg0, arg1);
      return result;
    }
  }
  async toggleBestseller(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleBestseller(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleBestseller(arg0);
      return result;
    }
  }
  async toggleCouponActive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleCouponActive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleCouponActive(arg0);
      return result;
    }
  }
  async toggleFeatured(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleFeatured(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleFeatured(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updateAdminCoupon(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateAdminCoupon(arg0, to_candid_AdminCoupon_n3(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateAdminCoupon(arg0, to_candid_AdminCoupon_n3(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateAdminTask(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateAdminTask(arg0, to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n63(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateAdminTask(arg0, to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n63(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateBlogPost(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateBlogPost(arg0, to_candid_BlogPost_n13(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n64(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateBlogPost(arg0, to_candid_BlogPost_n13(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n64(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateCartQuantity(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCartQuantity(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCartQuantity(arg0, arg1);
      return result;
    }
  }
  async updateExpense(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateExpense(arg0, arg1);
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateExpense(arg0, arg1);
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateInventory(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.updateInventory(arg0, arg1, arg2, arg3);
        return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateInventory(arg0, arg1, arg2, arg3);
      return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateInventoryStock(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.updateInventoryStock(arg0, arg1, arg2);
        return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateInventoryStock(arg0, arg1, arg2);
      return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateOrderStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateOrderStatus(arg0, to_candid_OrderStatus_n67(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateOrderStatus(arg0, to_candid_OrderStatus_n67(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateProduct(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProduct(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProduct(arg0, arg1);
      return result;
    }
  }
  async updateStoreSettings(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateStoreSettings(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateStoreSettings(arg0);
      return result;
    }
  }
  async updateTask(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateTask(arg0, to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n63(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateTask(arg0, to_candid_AdminTask_n8(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n63(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateTeamMember(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateTeamMember(arg0, arg1);
        return from_candid_opt_n69(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateTeamMember(arg0, arg1);
      return from_candid_opt_n69(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateUserProfile(arg0);
        return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateUserProfile(arg0);
      return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async upsertInventoryItem(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.upsertInventoryItem(to_candid_InventoryItem_n70(this._uploadFile, this._downloadFile, arg0));
        return from_candid_InventoryItem_n48(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.upsertInventoryItem(to_candid_InventoryItem_n70(this._uploadFile, this._downloadFile, arg0));
      return from_candid_InventoryItem_n48(this._uploadFile, this._downloadFile, result);
    }
  }
  async validateCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.validateCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.validateCoupon(arg0);
      return result;
    }
  }
  async verifyAdminCredentials(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.verifyAdminCredentials(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.verifyAdminCredentials(arg0, arg1);
      return result;
    }
  }
}
function from_candid_ActivityType_n36(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n37(_uploadFile, _downloadFile, value);
}
function from_candid_Address__1_n29(_uploadFile, _downloadFile, value) {
  return from_candid_record_n30(_uploadFile, _downloadFile, value);
}
function from_candid_AdminCoupon_n5(_uploadFile, _downloadFile, value) {
  return from_candid_record_n6(_uploadFile, _downloadFile, value);
}
function from_candid_AdminTask_n10(_uploadFile, _downloadFile, value) {
  return from_candid_record_n11(_uploadFile, _downloadFile, value);
}
function from_candid_BlogPost_n15(_uploadFile, _downloadFile, value) {
  return from_candid_record_n16(_uploadFile, _downloadFile, value);
}
function from_candid_EnrichedCustomerProfile_n40(_uploadFile, _downloadFile, value) {
  return from_candid_record_n41(_uploadFile, _downloadFile, value);
}
function from_candid_InventoryItem_n48(_uploadFile, _downloadFile, value) {
  return from_candid_record_n49(_uploadFile, _downloadFile, value);
}
function from_candid_OrderStatus_n25(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n26(_uploadFile, _downloadFile, value);
}
function from_candid_Order_n23(_uploadFile, _downloadFile, value) {
  return from_candid_record_n24(_uploadFile, _downloadFile, value);
}
function from_candid_PaymentMethod_n27(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n28(_uploadFile, _downloadFile, value);
}
function from_candid_StripeSessionStatus_n55(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n56(_uploadFile, _downloadFile, value);
}
function from_candid_UserActivity_n34(_uploadFile, _downloadFile, value) {
  return from_candid_record_n35(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n44(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n45(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n12(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n46(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_EnrichedCustomerProfile_n40(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n50(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Order_n23(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n51(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n54(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n59(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n62(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_AdminCoupon_n5(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n63(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_AdminTask_n10(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n64(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_BlogPost_n15(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n65(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n66(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_InventoryItem_n48(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n69(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    assignedTo: record_opt_to_undefined(from_candid_opt_n12(_uploadFile, _downloadFile, value.assignedTo)),
    createdAt: value.createdAt,
    completed: value.completed,
    dueDate: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.dueDate)),
    description: value.description,
    notes: value.notes,
    category: value.category,
    priority: value.priority
  };
}
function from_candid_record_n16(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    metaDescription: value.metaDescription,
    status: value.status,
    title: value.title,
    content: value.content,
    publishDate: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.publishDate)),
    featuredImage: value.featuredImage,
    createdAt: value.createdAt,
    slug: value.slug,
    tags: value.tags,
    updatedAt: value.updatedAt,
    metaTitle: value.metaTitle,
    excerpt: value.excerpt
  };
}
function from_candid_record_n24(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_OrderStatus_n25(_uploadFile, _downloadFile, value.status),
    couponCode: record_opt_to_undefined(from_candid_opt_n12(_uploadFile, _downloadFile, value.couponCode)),
    paymentMethod: from_candid_PaymentMethod_n27(_uploadFile, _downloadFile, value.paymentMethod),
    userId: value.userId,
    discountAmount: value.discountAmount,
    createdAt: value.createdAt,
    totalAmount: value.totalAmount,
    address: from_candid_Address__1_n29(_uploadFile, _downloadFile, value.address),
    stripePaymentId: record_opt_to_undefined(from_candid_opt_n12(_uploadFile, _downloadFile, value.stripePaymentId)),
    items: value.items
  };
}
function from_candid_record_n30(_uploadFile, _downloadFile, value) {
  return {
    street: value.street,
    country: value.country,
    gstNumber: record_opt_to_undefined(from_candid_opt_n12(_uploadFile, _downloadFile, value.gstNumber)),
    city: value.city,
    postalCode: value.postalCode,
    state: value.state
  };
}
function from_candid_record_n35(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    activityType: from_candid_ActivityType_n36(_uploadFile, _downloadFile, value.activityType),
    metadata: value.metadata,
    userId: value.userId,
    timestamp: value.timestamp
  };
}
function from_candid_record_n41(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: value.status,
    totalOrders: value.totalOrders,
    name: value.name,
    createdAt: value.createdAt,
    email: value.email,
    totalSpend: value.totalSpend,
    phone: value.phone,
    lastLogin: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.lastLogin)),
    activityCount: value.activityCount
  };
}
function from_candid_record_n43(_uploadFile, _downloadFile, value) {
  return {
    totalOrders: value.totalOrders,
    totalActivities: value.totalActivities,
    newUsersToday: value.newUsersToday,
    recentActivities: from_candid_vec_n33(_uploadFile, _downloadFile, value.recentActivities),
    activeUsersToday: value.activeUsersToday,
    totalRegisteredUsers: value.totalRegisteredUsers,
    totalExpenses: value.totalExpenses,
    totalRevenue: value.totalRevenue,
    totalCustomers: value.totalCustomers,
    avgOrderValue: value.avgOrderValue,
    netProfit: value.netProfit
  };
}
function from_candid_record_n49(_uploadFile, _downloadFile, value) {
  return {
    supplierContact: value.supplierContact,
    lowStockThreshold: value.lowStockThreshold,
    purchaseCost: value.purchaseCost,
    expiryDate: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.expiryDate)),
    supplierName: value.supplierName,
    lastUpdated: value.lastUpdated,
    productId: value.productId,
    incomingStock: value.incomingStock,
    reservedStock: value.reservedStock,
    batchNumber: value.batchNumber,
    currentStock: value.currentStock,
    damagedStock: value.damagedStock
  };
}
function from_candid_record_n57(_uploadFile, _downloadFile, value) {
  return {
    userPrincipal: record_opt_to_undefined(from_candid_opt_n12(_uploadFile, _downloadFile, value.userPrincipal)),
    response: value.response
  };
}
function from_candid_record_n6(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    minCartValue: value.minCartValue,
    active: value.active,
    discountValue: value.discountValue,
    expiresAt: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.expiresAt)),
    code: value.code,
    createdAt: value.createdAt,
    discountType: value.discountType,
    usedCount: value.usedCount,
    description: value.description,
    maxUses: value.maxUses
  };
}
function from_candid_variant_n26(_uploadFile, _downloadFile, value) {
  return "shipped" in value ? "shipped" : "cancelled" in value ? "cancelled" : "pending" in value ? "pending" : "delivered" in value ? "delivered" : "processing" in value ? "processing" : value;
}
function from_candid_variant_n28(_uploadFile, _downloadFile, value) {
  return "cod" in value ? "cod" : "stripe" in value ? "stripe" : value;
}
function from_candid_variant_n37(_uploadFile, _downloadFile, value) {
  return "Login" in value ? "Login" : "WishlistRemove" in value ? "WishlistRemove" : "CouponUsed" in value ? "CouponUsed" : "OrderPlaced" in value ? "OrderPlaced" : "ProductView" in value ? "ProductView" : "Logout" in value ? "Logout" : "NewsletterSignup" in value ? "NewsletterSignup" : "ProfileUpdated" in value ? "ProfileUpdated" : "CartAdd" in value ? "CartAdd" : "SearchQuery" in value ? "SearchQuery" : "ReviewSubmitted" in value ? "ReviewSubmitted" : "WishlistAdd" in value ? "WishlistAdd" : "B2BInquiry" in value ? "B2BInquiry" : "CartRemove" in value ? "CartRemove" : "AddressAdded" in value ? "AddressAdded" : value;
}
function from_candid_variant_n45(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n56(_uploadFile, _downloadFile, value) {
  return "completed" in value ? {
    __kind__: "completed",
    completed: from_candid_record_n57(_uploadFile, _downloadFile, value.completed)
  } : "failed" in value ? {
    __kind__: "failed",
    failed: value.failed
  } : value;
}
function from_candid_vec_n31(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_AdminCoupon_n5(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n32(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_AdminTask_n10(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n33(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_UserActivity_n34(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n38(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_BlogPost_n15(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n39(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_EnrichedCustomerProfile_n40(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n42(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Order_n23(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n47(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_InventoryItem_n48(_uploadFile, _downloadFile, x));
}
function to_candid_ActivityType_n60(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n61(_uploadFile, _downloadFile, value);
}
function to_candid_Address__1_n21(_uploadFile, _downloadFile, value) {
  return to_candid_record_n22(_uploadFile, _downloadFile, value);
}
function to_candid_AdminCoupon_n3(_uploadFile, _downloadFile, value) {
  return to_candid_record_n4(_uploadFile, _downloadFile, value);
}
function to_candid_AdminTask_n8(_uploadFile, _downloadFile, value) {
  return to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_BlogPost_n13(_uploadFile, _downloadFile, value) {
  return to_candid_record_n14(_uploadFile, _downloadFile, value);
}
function to_candid_CreateOrderInput_n17(_uploadFile, _downloadFile, value) {
  return to_candid_record_n18(_uploadFile, _downloadFile, value);
}
function to_candid_InventoryItem_n70(_uploadFile, _downloadFile, value) {
  return to_candid_record_n71(_uploadFile, _downloadFile, value);
}
function to_candid_OrderStatus_n67(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n68(_uploadFile, _downloadFile, value);
}
function to_candid_PaymentMethod_n19(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function to_candid_ProductFilter_n52(_uploadFile, _downloadFile, value) {
  return to_candid_record_n53(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n1(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n58(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n14(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    metaDescription: value.metaDescription,
    status: value.status,
    title: value.title,
    content: value.content,
    publishDate: value.publishDate ? candid_some(value.publishDate) : candid_none(),
    featuredImage: value.featuredImage,
    createdAt: value.createdAt,
    slug: value.slug,
    tags: value.tags,
    updatedAt: value.updatedAt,
    metaTitle: value.metaTitle,
    excerpt: value.excerpt
  };
}
function to_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    couponCode: value.couponCode ? candid_some(value.couponCode) : candid_none(),
    paymentMethod: to_candid_PaymentMethod_n19(_uploadFile, _downloadFile, value.paymentMethod),
    address: to_candid_Address__1_n21(_uploadFile, _downloadFile, value.address),
    stripePaymentId: value.stripePaymentId ? candid_some(value.stripePaymentId) : candid_none(),
    items: value.items
  };
}
function to_candid_record_n22(_uploadFile, _downloadFile, value) {
  return {
    street: value.street,
    country: value.country,
    gstNumber: value.gstNumber ? candid_some(value.gstNumber) : candid_none(),
    city: value.city,
    postalCode: value.postalCode,
    state: value.state
  };
}
function to_candid_record_n4(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    minCartValue: value.minCartValue,
    active: value.active,
    discountValue: value.discountValue,
    expiresAt: value.expiresAt ? candid_some(value.expiresAt) : candid_none(),
    code: value.code,
    createdAt: value.createdAt,
    discountType: value.discountType,
    usedCount: value.usedCount,
    description: value.description,
    maxUses: value.maxUses
  };
}
function to_candid_record_n53(_uploadFile, _downloadFile, value) {
  return {
    featured: value.featured ? candid_some(value.featured) : candid_none(),
    minRating: value.minRating ? candid_some(value.minRating) : candid_none(),
    sortBy: value.sortBy ? candid_some(value.sortBy) : candid_none(),
    maxPrice: value.maxPrice ? candid_some(value.maxPrice) : candid_none(),
    category: value.category ? candid_some(value.category) : candid_none(),
    minPrice: value.minPrice ? candid_some(value.minPrice) : candid_none(),
    searchQuery: value.searchQuery ? candid_some(value.searchQuery) : candid_none()
  };
}
function to_candid_record_n71(_uploadFile, _downloadFile, value) {
  return {
    supplierContact: value.supplierContact,
    lowStockThreshold: value.lowStockThreshold,
    purchaseCost: value.purchaseCost,
    expiryDate: value.expiryDate ? candid_some(value.expiryDate) : candid_none(),
    supplierName: value.supplierName,
    lastUpdated: value.lastUpdated,
    productId: value.productId,
    incomingStock: value.incomingStock,
    reservedStock: value.reservedStock,
    batchNumber: value.batchNumber,
    currentStock: value.currentStock,
    damagedStock: value.damagedStock
  };
}
function to_candid_record_n9(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    assignedTo: value.assignedTo ? candid_some(value.assignedTo) : candid_none(),
    createdAt: value.createdAt,
    completed: value.completed,
    dueDate: value.dueDate ? candid_some(value.dueDate) : candid_none(),
    description: value.description,
    notes: value.notes,
    category: value.category,
    priority: value.priority
  };
}
function to_candid_variant_n2(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function to_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return value == "cod" ? {
    cod: null
  } : value == "stripe" ? {
    stripe: null
  } : value;
}
function to_candid_variant_n61(_uploadFile, _downloadFile, value) {
  return value == "Login" ? {
    Login: null
  } : value == "WishlistRemove" ? {
    WishlistRemove: null
  } : value == "CouponUsed" ? {
    CouponUsed: null
  } : value == "OrderPlaced" ? {
    OrderPlaced: null
  } : value == "ProductView" ? {
    ProductView: null
  } : value == "Logout" ? {
    Logout: null
  } : value == "NewsletterSignup" ? {
    NewsletterSignup: null
  } : value == "ProfileUpdated" ? {
    ProfileUpdated: null
  } : value == "CartAdd" ? {
    CartAdd: null
  } : value == "SearchQuery" ? {
    SearchQuery: null
  } : value == "ReviewSubmitted" ? {
    ReviewSubmitted: null
  } : value == "WishlistAdd" ? {
    WishlistAdd: null
  } : value == "B2BInquiry" ? {
    B2BInquiry: null
  } : value == "CartRemove" ? {
    CartRemove: null
  } : value == "AddressAdded" ? {
    AddressAdded: null
  } : value;
}
function to_candid_variant_n68(_uploadFile, _downloadFile, value) {
  return value == "shipped" ? {
    shipped: null
  } : value == "cancelled" ? {
    cancelled: null
  } : value == "pending" ? {
    pending: null
  } : value == "delivered" ? {
    delivered: null
  } : value == "processing" ? {
    processing: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  useActor as a,
  createActor as c,
  useQuery as u
};
