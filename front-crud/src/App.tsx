import React from "react";
import ImageUploadForm from "./components/ImageUploadForm";
import ImageList from "./components/ImageList";

const App: React.FC = () => {
  return (
    <div className="space-y-8">
      <ImageUploadForm />
      <hr />
      <ImageList />
    </div>
  );
};

export default App;
