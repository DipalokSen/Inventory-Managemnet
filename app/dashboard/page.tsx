import Sidebar from "@/Components/Sidebar";
import { getCurrentUser } from "@/lib/auth";

import ProductChart from "@/Components/productChart";

import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const totalProducts = await prisma.product.count({
    where: { userId },
  });

  const recentProduct = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const lowStock = await prisma.product.findMany({
    where: {
      userId,
      lowStockAt: { not: null },
      quantity: { lte: 5 },
    },
  });

  const allProduct = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });

  const totalPrice = allProduct.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

 

  const now = new Date();

  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

    const weekProducts = allProduct.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const lowStockCount = allProduct.filter(
    (p) => Number(p.quantity) <= 5
  ).length;
  const outOfStockCount = allProduct.filter(
    (p) => Number(p.quantity) === 0
  ).length;
  const inStockCount = allProduct.filter((p) => Number(p.quantity) > 5).length;

  const lowStackPerecentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round( (outOfStockCount / totalProducts) * 100) : 0;
  const inStockPercentage =
    totalProducts > 0 ? Math.round( (inStockCount / totalProducts) * 100) : 0;

  console.log("total", totalProducts);
  console.log("recent", recentProduct);
  console.log("all", allProduct);
  console.log("total price", totalPrice);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentRoute="/dashboard" />

      <div className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 mt-4">
          <div className="bg-white rounded-xl p-4">
            <span className="font-semibold text-black text-lg">
              Key Metrics
            </span>

            <div className="grid grid-cols-3 mt-4">
              <div className="text-center">
                <div className="font-bold text-2xl">{totalProducts}</div>
                <div className="text-sm text-gray-800">Total Products</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <div className="text-xs">+{totalProducts}</div>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="text-center">
                <div className="font-bold text-2xl">${totalPrice.toFixed(2)}</div>
                <div className="text-sm text-gray-800">Total Value</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <div className="text-xs">+{totalPrice.toFixed(2)}</div>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="text-center">
                <div className="font-bold text-2xl">
                  {lowStock.length > 0 ? lowStock.length : "0"}
                </div>
                <div className="text-sm text-gray-800">Low Stock</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <div className="text-xs">
                    + {lowStock.length > 0 ? lowStock.length : "0"}
                  </div>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-gray-300">
            <div className="flex items-center p-4 font-semibold text-lg">
              New Products Per Week
            </div>

            <ProductChart data={weeklyProductsData} />

            <div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <div className="bg-white rounded-xl p-4 mb-4 border-gray-400">
            <div className="flex justify-between items-center">
              <span className="font-bold">Stock Levels</span>
            </div>

            {recentProduct.map((product) => {
              const stockLevel =
                product.quantity === 0
                  ? 0
                  : product.quantity < (product.lowStockAt || 0)
                  ? 1
                  : 2;

              const stockColor = [
                "bg-red-500",
                "bg-yellow-500",
                "bg-green-500",
              ];

              const stockText = [
                "text-red-500",
                "text-yellow-500",
                "text-green-500",
              ];

              return (
                <div className="bg-gray-100 flex justify-between items-center mt-3 p-2 rounded-lg">
                  <div className="flex items-center gap-2 justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${stockColor[stockLevel]}`}
                    />
                    <h2 className="font-bold text-sm">{product.name}</h2>
                  </div>

                  <div
                    className={`${stockText[stockLevel]} font-semibold text-sm`}
                  >
                    {product.quantity} units
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Efficiency
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-purple-600"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">In Stock</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-200" />
                  <span>In Stock {inStockPercentage}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span>Low stock {lowStackPerecentage}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <span>Out of Stock {outOfStockPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
