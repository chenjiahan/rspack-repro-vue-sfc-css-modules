import { createApp } from "vue";
import A from "./A.vue";

const root = document.createElement("div");
root.id = "root";
document.body.append(root);
createApp(A).mount("#root");
