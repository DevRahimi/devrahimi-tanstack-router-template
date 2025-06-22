import { createFileRoute } from "@tanstack/react-router";

// import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="h-dvh bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-orange-500">DevRahimi</span> <span className="text-gray-900">TanStack Router</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl">
          Type-safe routing template for modern React applications
        </p>
        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
