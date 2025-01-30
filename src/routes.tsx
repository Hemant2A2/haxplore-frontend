import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Collaboration from "./pages/Collaboration";
import Export from "./pages/Export";
import VersionHistory from "./pages/VersionHistory";

const routes = [
  { path: "/", component: Home },
  { path: "/editor", component: Editor },
  { path: "/collaboration", component: Collaboration },
  { path: "/export", component: Export },
  { path: "/history", component: VersionHistory },
];

export default routes;
