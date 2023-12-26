import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { CATEGORY_API } from "../services/category";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

const CategoryEditScreen = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;
  const [disableEdit, setDisableEdit] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { user: userLogin } = useSelector((state) => state.userLogin);

  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (!userLogin || !userLogin?.isAdmin) {
      navigate("/profile");
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    (async () => {
      const res = await CATEGORY_API.getCategory(categoryId);
      setCategory(res);
    })();
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.icon);
    }
  }, [category]);

  // Upload Avatar Handler

  const handleProductImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("product", file);

    try {
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload/product`,
        formData,
        config
      );
      setImage((prev) => {
        prev.unshift(data.url);
        return prev;
      });

      try {
        toast.promise(
          CATEGORY_API.updateCategory({ id: categoryId, icon: image }),
          {
            loading: "Loading...",
            success: "Category updated successfully",
            error: "Something went wrong",
          }
        );
        queryClient.invalidateQueries(["categories", { page: 1 }]);
      } catch (error) {
        console.error(error);
      }

      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Submit form handler

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.promise(
        CATEGORY_API.updateCategory({ id: categoryId, name, icon: image }),
        {
          loading: "Loading...",
          success: "Category updated successfully",
          error: "Something went wrong",
        }
      );
    } catch (error) {
      console.error(error);
    }

    setDisableEdit(true);
  };

  return (
    <>
      {uploading && <Loader />}
      <div className="flex items-center justify-between pb-3 border-b-2 mb-5">
        <h3 className="text-gray-800 text-xl font-medium">Category Details</h3>
        {disableEdit && (
          <button
            className="text-purple-900 transition-colors duration-300 flex items-center"
            onClick={() => setDisableEdit(!disableEdit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            &nbsp; <span>Edit</span>
          </button>
        )}
      </div>

      <div className="max-w-lg">
        <form className="space-y-3" {...{ onSubmit }}>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
            <div className="relative w-24 h-24 rounded-xl img-container overflow-hidden border-2 border-gray-200 border-dashed flex justify-center items-center">
              <div className="absolute top-0 left-0 w-full h-full img-overlay"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <label
                htmlFor="upload-product"
                className="flex justify-center w-full upload-btn text-white h-full absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm"
                style={{ color: "#fff !important" }}
              >
                <input
                  type="file"
                  id="upload-product"
                  name="product"
                  className="opacity-0 cursor-pointer absolute top-0 left-0"
                  onChange={handleProductImage}
                />
              </label>
            </div>
            {image?.map((i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded-xl img-container overflow-hidden border-2 border-gray-200 border-dashed"
              >
                <div className="absolute top-0 left-0 w-full h-full img-overlay"></div>
                <img
                  src={i}
                  alt=""
                  className="w-full h-full object-cover block"
                />
                {!disableEdit && (
                  <button
                    onClick={() =>
                      setImage((prev) => prev.filter((img) => img !== i))
                    }
                    className="flex justify-center w-full upload-btn text-white h-1/3 absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm"
                    style={{ color: "#fff !important" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="w-full">
            <label
              htmlFor="name"
              className="font-semibold text-gray-700 block pb-2"
            >
              Category title
            </label>
            <div className="flex">
              <input
                disabled={disableEdit}
                id="name"
                name="name"
                className={
                  "text-gray-600 px-4 rounded-md bg-gray-100 w-full" +
                  (!disableEdit ? " border-gray-300" : " border-transparent")
                }
                type="text"
                value={name}
                placeholder="Enter product title"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {!disableEdit && (
            <div className="flex items-center space-x-5">
              <button
                type="button"
                className="rounded-md border-2 px-5 py-2 text-gray-700 font-light hover:bg-gray-50 transition-colors duration-300"
                onClick={() => setDisableEdit(true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CategoryEditScreen;
