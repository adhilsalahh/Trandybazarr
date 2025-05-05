export const Products = {
  async getAllProducts(filters = {}) {
    try {
      const { page = 1 } = filters;

      // Mock query result
      const mockProducts = [];
      const mockPagination = {
        currentPage: page,
        totalPages: 1,
        totalItems: 0
      };

      return { products: mockProducts, pagination: mockPagination };
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },

  async getProductById() {
    try {
      // Mock product data
      const mockProduct = null;
      return { product: mockProduct };
    } catch (error) {
      throw new Error('Error fetching product');
    }
  },

  async createProduct(productData, supplierId) {
    try {
      const {
        name,
        description,
        price,
        category_id,
        sku,
        quantity,
        images
      } = productData;

      // Create product
      const product = {
        supplier_id: supplierId,
        category_id,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        price,
        sku,
        quantity
      };

      // Mock image creation
      const mockImages = images?.map((url, index) => ({
        url,
        is_primary: index === 0
      }));

      return { product, images: mockImages };
    } catch (error) {
      throw new Error('Error creating product');
    }
  }
};