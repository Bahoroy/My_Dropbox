import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./fbase/firebase";
import { Link } from "react-router-dom";

function Home({ user }) {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const filesQuery = query(
          collection(firestore, "files"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(filesQuery);

        const files = querySnapshot.docs.map((doc) => doc.data());
        setUserFiles(files);
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };

    if (user) {
      fetchUserFiles();
    }
  }, [user]);

  return (
    <div>
    <table className="border-collapse w-full">
      <thead>
        <tr>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            File name
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {userFiles.length > 0 ? (
          userFiles.map((file) => (
            <tr
              key={file.url}
              className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  File name
                </span>
                {file.name}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Action
                </span>
                <a
                  href={file.url}
                  target="_blank"
                  className="rounded bg-green-400 py-1 px-3 text-xs font-bold"
                >
                  Show
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={2}
              className="p-3 text-gray-800 text-center border border-b text-center"
            >
              You don't have any files. <br />
            <Link className="text-teal-dark"  to='/upload' >Upload File</Link>
            </td> 
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default Home;
