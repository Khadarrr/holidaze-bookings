// import { createApiKey } from "./lib/data";

// const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWlySm9yZGFuIiwiZW1haWwiOiJNSi0yM0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzI2NzQyN30.cvRlT1F02mE2IHVdrCDEkLhN9U2DnhD6LhFfOv79SLY"; // Replace with your actual access token

// console.log("Creating API Key...");

// createApiKey(accessToken)
//   .then(apiKey => {
//     if (apiKey) {
//       console.log("API Key created successfully:", apiKey);
//     } else {
//       console.log("Failed to create API Key.");
//     }
//   })
//   .catch(error => {
//     console.error("Error creating API key:", error);
//   });

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <div className="mt-10 relative max-w-5xl mx-auto">
      <div className="w-full object-cover h-96 sm:h-[480px]  bg-no-repeat bg-center bg-cover rounded-xl"></div>

      

      <div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-neutral-900">
        <div className="bg-white size-48 rounded-lg dark:bg-neutral-900"></div>
      </div>

      <div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
        <div className="bg-white size-48 rounded-full dark:bg-neutral-900"></div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
