"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { productAtom } from "../Atoms/productsAtom";
import { allProduct } from "../backend/manageProduct";
import { loadingAtom } from "../Atoms/loadingAtom";
import { userAtom } from "../Atoms/userAtom";
import PopularProduct from "../Componets/PopularProduct";
import WhatsappContectButton from "../Componets/WhatsappContectButton";
import SendRequirementButton from "../Componets/SendRequirementButton";
import Loading from "../Componets/Loading";
import ReactImageMagnify from "react-image-magnify";
import { ChevronRight, Home, Info, Package, Star, Truck } from "lucide-react";

const ProductDetail = () => {
  const params = useParams();
  const userAtm = useRecoilValue(userAtom);
  const [products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [product, setProduct] = useState();
  const [activeTab, setActiveTab] = useState("specifications");

  useEffect(() => {
    scrollToTop();
    setUp();
  }, [params, products]);

  const setUp = async () => {
    setIsLoading(true);
    if (products === null) {
      setProducts(await allProduct());
    }

    let prod = null;

    if (products !== null) {
      products.map((p) => {
        if (p.id == params.id) {
          prod = p;
        }
      });
      setProduct(prod);
    }

    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <Loading />;
  if (!product) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-gray-600">
        <Home size={16} className="mr-1" />
        <span>Home</span>
        <ChevronRight size={16} className="mx-1" />
        <span>{product.category}</span>
        <ChevronRight size={16} className="mx-1" />
        <span className="text-gray-900 font-medium truncate">
          {product.name}
        </span>
      </div>

      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center">
              <div className="hidden lg:block w-full max-w-md mx-auto">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name || "Product Image",
                      isFluidWidth: true,
                      src: product.img,
                    },
                    largeImage: {
                      src: product.img,
                      width: 1600,
                      height: 2400,
                    },
                    enlargedImagePosition: "over",
                    hoverDelayInMs: 100,
                    hoverOffDelayInMs: 150,
                    isActivatedOnTouch: true,
                    enlargedImageContainerDimensions: {
                      width: "150%",
                      height: "150%"
                    },
                    shouldHideHintAfterFirstActivation: false,
                    hintTextMouse: "Hover to zoom",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  Premium Quality
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Package size={18} className="text-gray-500 mr-2" />
                  <span className="font-medium">Product Highlights</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    <span>
                      Category:{" "}
                      <span className="font-medium">{product.category}</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    <span>
                      MOQ:{" "}
                      <span className="font-medium">{product.moq} Piece</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    <span>
                      Size: <span className="font-medium">{product.size}</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    <span>
                      Material:{" "}
                      <span className="font-medium">{product.material}</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center mb-6">
                <Truck size={18} className="text-gray-500 mr-2" />
                <span className="text-sm">
                  <span className="font-medium">Business Type:</span>{" "}
                  Manufacturers, Trader, Supplier
                </span>
              </div>

              <div className="flex items-center mb-6">
                <Info size={18} className="text-gray-500 mr-2" />
                <span className="text-sm">
                  <span className="font-medium">Country of Origin:</span> India
                </span>
              </div>

              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WhatsappContectButton product={product} />
                <SendRequirementButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "specifications"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "details"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Product Details
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "specifications" && (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                        Category
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        MOQ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.moq} Piece
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Business Type
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Manufacturers, Trader, Supplier
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Country of Origin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        India
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Size
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.size}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Material
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.material}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Physical Properties
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shape:</span>
                      <span className="font-medium">
                        {product.details?.shape || "----"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">
                        {product.details?.color || "----"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Appearance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pattern:</span>

                      <span className="font-medium">
                        {product.details?.pattern || "----"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finish:</span>
                      <span className="font-medium">
                        {product.details?.finish || "----"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 bg-gray-200 flex-1"></div>
          <h2 className="px-6 text-2xl font-bold text-gray-900">
            Similar Products
          </h2>
          <div className="h-0.5 bg-gray-200 flex-1"></div>
        </div>

        {product && (
          <PopularProduct
            productId={product.id}
            category={product.details?.category || product.category}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
