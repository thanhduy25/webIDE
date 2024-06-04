const treeTest = [
  {
    type: "tree",
    name: "tree1",
    path: "src",
    children: [
      {
        type: "tree",
        name: "tree2",
        path: "components",
        children: [
          {
            type: "blob",
            name: "blob1",
            path: "components/Component1.jsx",
          },
          {
            type: "blob",
            name: "blob2",
            path: "components/Component2.jsx",
          },
          {
            type: "tree",
            name: "tree3",
            path: "components/tree3",
            children: [
              {
                type: "blob",
                name: "blob3",
                path: "components/tree3/Component1.jsx",
              },
              {
                type: "blob",
                name: "blob4",
                path: "components/tree3/Component2.jsx",
              },
              {
                type: "tree",
                name: "tree4",
                path: "components/tree4",
                children: [
                  {
                    type: "blob",
                    name: "blob5",
                    path: "components/tree4/Component1.jsx",
                  },
                  {
                    type: "blob",
                    name: "blob6",
                    path: "components/tree4/Component2.jsx",
                  },
                ],
              },
            ],
          },
          {
            type: "tree",
            name: "tree5",
            path: "pages",
            children: [
              {
                type: "blob",
                name: "blob7",
                path: "pages/Page1.jsx",
              },
              {
                type: "blob",
                name: "blob8",
                path: "pages/Page2.jsx",
              },
            ],
          },
        ],
      },
      {
        type: "tree",
        name: "tree6",
        path: "public",
        children: [
          {
            type: "blob",
            name: "blob9",
            path: "public/index.html",
          },
        ],
      },
    ],
  },
];

const pathEx = "components/tree4/Component2.jsx";

const triggerBtn = document.getElementById("trigger");

const isItemExistInCreateAction = (path) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return false;
  
  const result = actions.some(action => {
    console.log(action);
    if (action.action === "create" && action.file_path === path) {
      return true
    }
    return false;
  });
  return result;
}

triggerBtn.addEventListener("click", () => {
  console.log(isItemExistInCreateAction("F_2/F_2_1/adsad.txt"));
});
