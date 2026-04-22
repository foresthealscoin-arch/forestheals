import { r as reactExports, j as jsxRuntimeExports, a as Button, i as Search, I as Input, U as User } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { k as useAdminCustomers, A as AdminPLayout, l as APTag } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { M as MapPin } from "./map-pin-DbcUiQCi.js";
import { U as Users } from "./users-BTrxV2BM.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./star-D6nQNTvb.js";
function AdminPCustomers() {
  const {
    data: customers = [],
    isLoading,
    isError,
    refetch
  } = useAdminCustomers();
  const [search, setSearch] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = customers.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );
  const statusColor = {
    Active: "green",
    VIP: "yellow",
    Blocked: "red"
  };
  const formatDate = (ns) => new Date(Number(ns) / 1e6).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Customers", subtitle: "Manage customer accounts", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.customers.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load customers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-3",
              onClick: () => void refetch(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
                " Retry"
              ]
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Customers",
      subtitle: `${customers.length} registered customers`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by name, email, phone…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "adminp.customers.search_input"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "adminp.customers.loading_state", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "data-ocid": "adminp.customers.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Contact" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Total Spend" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden lg:table-cell", children: "Orders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `adminp.customers.item.${i + 1}`,
                    className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-green-700" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-sm truncate", children: c.name || "—" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: formatDate(c.createdAt) })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden md:table-cell", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-700", children: c.email || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: c.phone || "—" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: c.city || c.state ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: [c.city, c.state].filter(Boolean).join(", ") })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-300", children: "—" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right hidden sm:table-cell font-semibold text-[#004a38] text-sm", children: [
                        "₹",
                        Number(c.totalSpend).toLocaleString("en-IN")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden lg:table-cell text-gray-700 text-sm", children: Number(c.totalOrders) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        APTag,
                        {
                          label: c.status,
                          color: statusColor[c.status] ?? "gray"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "h-7 text-xs",
                          onClick: () => setSelected(c),
                          "data-ocid": `adminp.customers.item.${i + 1}.view_button`,
                          children: "View"
                        }
                      ) })
                    ]
                  },
                  c.id.toText()
                )),
                filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    colSpan: 7,
                    className: "py-12 text-center",
                    "data-ocid": "adminp.customers.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: search ? "No customers match your search" : "No customers yet — they'll appear when users register" })
                    ]
                  }
                ) })
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.customers.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Customer Details" }) }),
              selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: selected.name || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      APTag,
                      {
                        label: selected.status,
                        color: statusColor[selected.status] ?? "gray"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs break-all", children: selected.email || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Phone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.phone || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Total Orders" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900", children: Number(selected.totalOrders) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Total Spend" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-[#004a38]", children: [
                      "₹",
                      Number(selected.totalSpend).toLocaleString("en-IN")
                    ] })
                  ] }),
                  (selected.city || selected.state) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3 col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: [
                      selected.city,
                      selected.state,
                      selected.pincode,
                      selected.country
                    ].filter(Boolean).join(", ") })
                  ] }),
                  selected.addresses && selected.addresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3 col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mb-1", children: [
                      "Saved Addresses (",
                      selected.addresses.length,
                      ")"
                    ] }),
                    selected.addresses.slice(0, 2).map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-gray-700 text-xs mt-1",
                        children: [
                          addr.fullName,
                          " — ",
                          addr.street,
                          ", ",
                          addr.city,
                          ",",
                          " ",
                          addr.state,
                          " ",
                          addr.pincode,
                          addr.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[#004a38] font-semibold", children: "(Default)" })
                        ]
                      },
                      addr.id || addr.street
                    ))
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Principal ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs font-mono break-all", children: selected.id.toText() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full",
                    onClick: () => setSelected(null),
                    "data-ocid": "adminp.customers.modal.close_button",
                    children: "Close"
                  }
                )
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  AdminPCustomers as default
};
