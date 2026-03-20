import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UploadPage } from "./pages/UploadPage";
import { ResultPage } from "./pages/ResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/upload",
    Component: UploadPage,
  },
  {
    path: "/result",
    Component: ResultPage,
  },
  {
    path: "*",
    Component: () => {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
          <div className="text-center">
            <h1 className="mb-4">404 - 页面未找到</h1>
            <p className="text-gray-600 mb-6">抱歉，您访问的页面不存在</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              返回首页
            </a>
          </div>
        </div>
      );
    },
  },
]);
