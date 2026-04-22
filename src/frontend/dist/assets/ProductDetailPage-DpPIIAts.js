import { r as reactExports, j as jsxRuntimeExports, k as useComposedRefs, l as cn, n as useParams, o as useAuthStore, u as useActor, p as useQueryClient, a as Button, L as Link, m as motion, B as Badge, S as ShoppingBag, H as Heart, b as Shield, e as ue, q as useQuery, f as createActor } from "./index-CfU2kVIJ.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { P as Primitive, c as composeEventHandlers, a as createContextScope, u as useControllableState } from "./index-l7_3JU5-.js";
import { c as createCollection, u as useDirection } from "./index-Cv8ba7Pb.js";
import { u as useId, a as useCallbackRef, P as Presence } from "./index-D_sIzci6.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { P as ProductCard } from "./ProductCard-D6YMmcmu.js";
import { S as Star } from "./star-D6nQNTvb.js";
import { u as useCart } from "./useCart-BjgJtNmr.js";
import { c as useProduct, b as useProducts } from "./useProducts-B7nbWxOB.js";
import { g as getDiscountedPrice, f as formatPrice, a as formatDate } from "./formatters-CN9TrYCS.js";
import { P as Package } from "./package-C5tkAuNr.js";
import { L as Leaf } from "./leaf-BdKoN6HX.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { M as Minus } from "./minus-BUEJcusP.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import { C as Check } from "./check-DSd0zFnf.js";
import { T as Truck } from "./truck-DEhc-m44.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { A as ArrowLeft } from "./arrow-left-BC-g7eMh.js";
import "./tag-RoRywvnF.js";
import "./useMutation-DVPdZiQH.js";
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-6 h-6"
};
function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center gap-0.5", className),
      role: interactive ? "radiogroup" : void 0,
      "aria-label": `Rating: ${rating} out of ${max} stars`,
      children: Array.from({ length: max }, (_, i) => {
        const starNum = i + 1;
        const filled = starNum <= Math.floor(rating);
        const partial = !filled && i < rating;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: interactive ? "button" : void 0,
            onClick: interactive && onChange ? () => onChange(starNum) : void 0,
            disabled: !interactive,
            className: cn(
              "transition-smooth",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "pointer-events-none"
            ),
            "aria-label": interactive ? `Rate ${starNum} star${starNum !== 1 ? "s" : ""}` : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: cn(
                  sizeMap[size],
                  filled ? "fill-accent text-accent" : partial ? "fill-accent/50 text-accent" : "fill-muted text-muted-foreground"
                )
              }
            )
          },
          starNum
        );
      })
    }
  );
}
const USAGE_BY_CATEGORY = {
  "Ayurvedic Powders": [
    "Mix ½ teaspoon in warm milk, water or honey.",
    "Best consumed on an empty stomach in the morning or before bed.",
    "For maximum results use consistently for 30–90 days.",
    "Can be added to smoothies, juices or porridge."
  ],
  "Seeds & Spices": [
    "Add directly to cooking, salads or smoothies.",
    "Soak seeds overnight in water for easier digestion.",
    "Use as a garnish or blend into chutneys and dips.",
    "Store in a cool, dry place away from direct sunlight."
  ],
  "Essential Oils": [
    "Dilute with carrier oil (coconut / almond) before topical use.",
    "Add 2–3 drops to diffuser for aromatherapy.",
    "Not for direct ingestion unless specifically stated.",
    "Perform a patch test before full application."
  ],
  "Eco-Friendly": [
    "Follow care instructions on the packaging label.",
    "Compostable — dispose responsibly at end of life.",
    "Keep away from moisture to extend product life.",
    "Supports zero-waste lifestyle when used consistently."
  ],
  default: [
    "Follow the usage instructions on the packaging.",
    "Start with a small amount and adjust as needed.",
    "Consult a healthcare professional if pregnant, nursing or on medication.",
    "Keep out of reach of children."
  ]
};
function getUsageInstructions(category) {
  return USAGE_BY_CATEGORY[category] ?? USAGE_BY_CATEGORY.default;
}
function extractBenefits(description, name) {
  const keywords = [
    {
      match: /stress|adaptogen|anxiety/,
      benefit: "Reduces stress and promotes calm"
    },
    {
      match: /memory|brain|cognitive|focus/,
      benefit: "Boosts memory and mental clarity"
    },
    {
      match: /energy|vitality|stamina/,
      benefit: "Elevates energy and stamina"
    },
    { match: /immunity|immune/, benefit: "Strengthens immune system" },
    { match: /digestion|digestive|gut/, benefit: "Supports healthy digestion" },
    { match: /hair|scalp/, benefit: "Promotes hair growth and scalp health" },
    {
      match: /skin|glow|brightening/,
      benefit: "Improves skin tone and radiance"
    },
    {
      match: /antioxidant|anti-inflam/,
      benefit: "Rich in antioxidants and anti-inflammatory"
    },
    { match: /hormone|hormonal|balance/, benefit: "Supports hormonal balance" },
    { match: /sleep/, benefit: "Improves sleep quality" },
    {
      match: /blood sugar|diabetes/,
      benefit: "Helps regulate blood sugar levels"
    },
    {
      match: /detox|purif|cleanse/,
      benefit: "Natural detoxification and cleansing"
    },
    { match: /calcium|bone|mineral/, benefit: "Strengthens bones and joints" },
    {
      match: /vitamin|nutrient|superfood/,
      benefit: "Dense source of essential nutrients"
    },
    {
      match: /weight|metabolism/,
      benefit: "Supports healthy weight management"
    },
    {
      match: /heart|cardiovascular/,
      benefit: "Promotes cardiovascular health"
    }
  ];
  const text = `${name} ${description}`.toLowerCase();
  const found = keywords.filter((k) => k.match.test(text)).map((k) => k.benefit);
  return found.length >= 3 ? found.slice(0, 5) : [
    "100% natural, no artificial additives",
    "Ethically sourced from organic farms",
    "Eco-friendly kraft packaging",
    "Lab-tested for purity and potency"
  ].concat(found).slice(0, 5);
}
function calcDistribution(reviews) {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) {
    if (r.rating >= 1 && r.rating <= 5) dist[Math.round(r.rating)]++;
  }
  return dist;
}
function maskPrincipal(uid) {
  if (uid.length <= 8) return `${uid.slice(0, 4)}…`;
  return `${uid.slice(0, 5)}…${uid.slice(-3)}`;
}
function ReviewCard({ review }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "glass-card rounded-2xl p-5 shadow-soft",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: maskPrincipal(review.userId) }),
              review.verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                "Verified"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(review.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: review.text })
      ]
    }
  );
}
function useProductReviews(productId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.getProductReviews(BigInt(productId));
      return raw.filter((r) => r.approved).map((r) => ({
        id: Number(r.id),
        productId: Number(r.productId),
        userId: r.userId.toText(),
        rating: Number(r.rating),
        text: r.text,
        verified: r.verified,
        createdAt: Number(r.createdAt) / 1e6,
        approved: r.approved
      }));
    },
    enabled: productId > 0 && !!actor && !isFetching,
    staleTime: 60 * 1e3
  });
}
function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = Number(id);
  const { data: product, isLoading } = useProduct(productId);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuthStore();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [qty, setQty] = reactExports.useState(1);
  const [isAdded, setIsAdded] = reactExports.useState(false);
  const [reviewRating, setReviewRating] = reactExports.useState(5);
  const [reviewText, setReviewText] = reactExports.useState("");
  const [reviewSubmitting, setReviewSubmitting] = reactExports.useState(false);
  const [reviewSubmitted, setReviewSubmitted] = reactExports.useState(false);
  const [wishlist, setWishlist] = reactExports.useState(false);
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(productId);
  const { data: allProducts = [] } = useProducts(
    product ? { category: product.category } : void 0
  );
  const related = allProducts.filter((p) => p.id !== productId).slice(0, 4);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-3xl w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
      ] })
    ] }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-9 h-9 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-3", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 text-sm", children: "This product may have been removed or the link is incorrect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse Products" }) })
        ]
      }
    );
  }
  const finalPrice = product.discount > 0 ? getDiscountedPrice(product.price, product.discount) : product.price;
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : product.ratings;
  const distribution = calcDistribution(reviews);
  const benefits = extractBenefits(product.description, product.name);
  const usageSteps = getUsageInstructions(product.category);
  const handleAddToCart = () => {
    if (isAdded) return;
    addToCart(
      { productId: product.id, quantity: qty, price: finalPrice },
      product.name
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };
  const handleWishlist = () => {
    setWishlist((w) => !w);
    ue.success(
      wishlist ? "Removed from wishlist" : `${product.name} saved to wishlist`
    );
  };
  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      ue.error("Please write a review before submitting.");
      return;
    }
    setReviewSubmitting(true);
    try {
      if (actor) {
        await actor.createReview({
          productId: BigInt(productId),
          rating: BigInt(reviewRating),
          text: reviewText.trim()
        });
        void qc.invalidateQueries({ queryKey: ["reviews", productId] });
      }
      setReviewSubmitted(true);
      ue.success("Review submitted! It will appear after moderation.");
    } catch {
      ue.error("Failed to submit review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "product_detail.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary transition-smooth", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-primary transition-smooth", children: "Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: product.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[160px]", children: product.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10 xl:gap-16 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-3xl overflow-hidden glass-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                }
              }
            ) }),
            product.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 shadow-soft", children: [
              product.discount,
              "% OFF"
            ] }),
            product.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1", children: "Featured" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "flex flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "w-fit mb-4 bg-primary/10 text-primary border-none font-medium",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3 mr-1" }),
                  product.category
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: avgRating, size: "md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: avgRating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "(",
                reviews.length > 0 ? reviews.length : product.reviewCount,
                " ",
                "reviews)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-3xl text-primary", children: formatPrice(finalPrice) }),
              product.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground line-through", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/15 text-destructive border-none text-xs font-semibold", children: [
                  "Save ",
                  formatPrice(product.price - finalPrice)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: product.stock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              "In Stock (",
              product.stock,
              " units)"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-destructive", children: "Out of Stock" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5 text-sm", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6", children: benefits.slice(0, 4).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2.5 text-sm text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
                ]
              },
              b
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-xl border border-input overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQty((q) => Math.max(1, q - 1)),
                  className: "px-3 py-2.5 hover:bg-muted transition-smooth",
                  "aria-label": "Decrease quantity",
                  "data-ocid": "product_detail.qty.decrease_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-4 py-2.5 font-semibold text-sm min-w-[2.5rem] text-center",
                  "data-ocid": "product_detail.qty.value",
                  children: qty
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQty((q) => Math.min(product.stock, q + 1)),
                  className: "px-3 py-2.5 hover:bg-muted transition-smooth",
                  "aria-label": "Increase quantity",
                  "data-ocid": "product_detail.qty.increase_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  whileTap: { scale: 0.97 },
                  animate: isAdded ? { scale: [1, 1.05, 1] } : {},
                  transition: { duration: 0.3 },
                  className: "flex-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      className: `w-full gap-2 shadow-green transition-all duration-300 ${isAdded ? "bg-green-600 hover:bg-green-600" : ""}`,
                      onClick: handleAddToCart,
                      disabled: product.stock === 0,
                      "data-ocid": "product_detail.add_to_cart_button",
                      children: isAdded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                        "Added to Cart!"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                        "Add to Cart"
                      ] })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  onClick: handleWishlist,
                  className: `gap-2 ${wishlist ? "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20" : ""}`,
                  "data-ocid": "product_detail.wishlist_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `w-4 h-4 ${wishlist ? "fill-current" : ""}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: ["100g", "Eco-Friendly", "Kraft Packaging", "No Additives"].map(
              (tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full",
                  children: tag
                },
                tag
              )
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 pt-5 border-t border-border", children: [
              { icon: Shield, label: "Quality Assured" },
              { icon: Truck, label: "Free Shipping ≥₹499" },
              { icon: RefreshCw, label: "Easy Returns" }
            ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label })
            ] }, label)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-16",
        "data-ocid": "product_detail.tabs.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "description", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto mb-6 bg-muted/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "description",
                "data-ocid": "product_detail.tab.description",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "benefits",
                "data-ocid": "product_detail.tab.benefits",
                children: "Benefits"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "how-to-use",
                "data-ocid": "product_detail.tab.how_to_use",
                children: "How to Use"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "ingredients",
                "data-ocid": "product_detail.tab.ingredients",
                children: "Ingredients"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "description",
              className: "glass-card rounded-2xl p-6 shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-3", children: [
                  "About ",
                  product.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: product.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm mt-3", children: "Forestheals sources all ingredients directly from certified organic farms and wild-harvested forests. Every batch is tested for purity, potency, and heavy metals. No synthetic fillers, no preservatives, no compromises." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "benefits",
              className: "glass-card rounded-2xl p-6 shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Key Benefits" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: benefits.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-3 text-sm text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary" }) }),
                      b
                    ]
                  },
                  b
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "how-to-use",
              className: "glass-card rounded-2xl p-6 shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "How to Use" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: usageSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-3 text-sm text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
                      step
                    ]
                  },
                  step
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-5 p-3 bg-muted/50 rounded-xl", children: "⚠️ Consult a qualified Ayurvedic practitioner or physician before use if you are pregnant, nursing, or taking prescription medication." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "ingredients",
              className: "glass-card rounded-2xl p-6 shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Ingredients" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium mb-3", children: [
                  "100% Pure ",
                  product.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: "No additives · No preservatives · No artificial colours · No fillers · No synthetic fragrances" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                  "Certified Organic",
                  "Lab Tested",
                  "Non-GMO",
                  "Vegan Friendly"
                ].map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 bg-primary/5 rounded-xl px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: cert })
                    ]
                  },
                  cert
                )) })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-16",
        "data-ocid": "product_detail.reviews.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-8 font-display", children: "Customer Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[280px_1fr] gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft h-fit", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl font-bold text-primary", children: avgRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StarRating,
                  {
                    rating: avgRating,
                    size: "lg",
                    className: "justify-center my-2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  reviews.length,
                  " ",
                  reviews.length === 1 ? "review" : "reviews"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] ?? 0;
                const pct = reviews.length > 0 ? Math.round(count / reviews.length * 100) : 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 text-xs text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 shrink-0", children: star }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-accent text-accent shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full bg-primary rounded-full transition-smooth",
                          style: { width: `${pct}%` }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-7 text-right shrink-0", children: [
                        pct,
                        "%"
                      ] })
                    ]
                  },
                  star
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "product_detail.reviews.list", children: reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }, i)) }) : reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "glass-card rounded-2xl p-8 text-center text-muted-foreground",
                "data-ocid": "product_detail.reviews.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No reviews yet. Be the first to review this product!" })
              }
            ) : reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review }, review.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-6 shadow-soft mt-8",
              "data-ocid": "product_detail.write_review.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Write a Review" }),
                !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-8",
                    "data-ocid": "product_detail.review.auth_gate",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Sign in to share your experience with this product." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", children: "Sign In to Review" }) })
                    ]
                  }
                ) : reviewSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "flex flex-col items-center py-8 text-center",
                    "data-ocid": "product_detail.review.success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-1", children: "Thank you for your review!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "It will be published after moderation." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: "Your Rating" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StarRating,
                      {
                        rating: reviewRating,
                        size: "lg",
                        interactive: true,
                        onChange: setReviewRating,
                        "data-ocid": "product_detail.review.star_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      placeholder: "Share your experience with this product…",
                      value: reviewText,
                      onChange: (e) => setReviewText(e.target.value),
                      className: "min-h-[120px] resize-none",
                      "data-ocid": "product_detail.review.textarea"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      onClick: handleReviewSubmit,
                      disabled: reviewSubmitting,
                      className: "gap-2",
                      "data-ocid": "product_detail.review.submit_button",
                      children: reviewSubmitting ? "Submitting…" : "Submit Review"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-12",
        "data-ocid": "product_detail.related.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-8 font-display", children: "You May Also Like" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        asChild: true,
        className: "gap-2",
        "data-ocid": "product_detail.back_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Products"
        ] })
      }
    )
  ] }) });
}
export {
  ProductDetailPage as default
};
