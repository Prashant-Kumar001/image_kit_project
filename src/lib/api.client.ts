import { IProduct } from "@/models/Product";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

class Product {
  private async request<T>(url: string, options: Options): Promise<T> {
    const { method = "GET", headers, body } = options;

    const defaultHeaders: Record<string, string> = {
      ...(method !== "GET" ? { "Content-Type": "application/json" } : {}),
      ...headers,
    };

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
    });

   if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getProduct() {
    return this.request<IProduct[]>("/api/products", { method: "GET" });
  }

  async getProductById(id: string) {
    return this.request<IProduct>(`/api/products/${id}`, { method: "GET" });
  }

  async createProduct(product: IProduct) {
    return this.request<IProduct>("/api/products", {
      method: "POST",
      body: product,
    });
  }
}
export const apiClient = new Product();
