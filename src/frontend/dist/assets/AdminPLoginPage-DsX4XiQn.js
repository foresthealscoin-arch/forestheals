import { c as createLucideIcon, y as useAdminPStore, h as useNavigate, u as useActor, r as reactExports, j as jsxRuntimeExports, U as User, I as Input, a as Button, e as ue, f as createActor } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { u as unwrapResult } from "./convert-Cs1e6Uux.js";
import { L as Leaf } from "./leaf-BdKoN6HX.js";
import { L as Lock } from "./lock-1IUDgA9h.js";
import { E as Eye } from "./eye-BjoUj9TI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function AdminPLoginPage() {
  const login = useAdminPStore((s) => s.login);
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (!actor || isFetching) {
        setError("Backend is not ready. Please wait a moment and try again.");
        return;
      }
      const result = await actor.verifyAdminCredentials(username, password);
      const ok = unwrapResult(result);
      if (ok) {
        login();
        localStorage.setItem("adminp_authed", "true");
        ue.success("Welcome back, Forestheals Admin!");
        void navigate({ to: "/admin-p/dashboard" });
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Login failed. Please check credentials and try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004a38] via-[#006b52] to-[#003a2c] px-4",
      "data-ocid": "adminp.login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-[#f1e0a9]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/logo.png",
              alt: "Forestheals",
              className: "h-14 w-auto object-contain mx-auto mb-3",
              style: { filter: "brightness(0) invert(1)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm", children: "Admin Panel — Secure Access" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900 mb-1", children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Enter your admin credentials to continue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ap-username", className: "text-gray-700", children: "Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ap-username",
                    value: username,
                    onChange: (e) => setUsername(e.target.value),
                    placeholder: "Admin username",
                    className: "pl-9",
                    autoComplete: "username",
                    "data-ocid": "adminp.login.username_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ap-password", className: "text-gray-700", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ap-password",
                    type: showPwd ? "text" : "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    placeholder: "••••••••••",
                    className: "pl-9 pr-10",
                    autoComplete: "current-password",
                    "data-ocid": "adminp.login.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPwd(!showPwd),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                    tabIndex: -1,
                    "aria-label": showPwd ? "Hide password" : "Show password",
                    children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2",
                "data-ocid": "adminp.login.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-[#004a38] hover:bg-[#003a2c] text-white mt-2",
                disabled: loading || isFetching,
                "data-ocid": "adminp.login.submit_button",
                children: loading ? "Signing in…" : isFetching ? "Connecting…" : "Sign In to Admin"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 text-center mt-5", children: "This panel is restricted to authorized Forestheals team only." })
        ] })
      ] })
    }
  );
}
export {
  AdminPLoginPage as default
};
