class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :set_categories, only: [:new, :edit, :index, :update]

  # GET /products
  # GET /products.json
  def index
    @category_id = params[:category_id]
    if @category_id
      @products = Product.where("category_id = #{@category_id}")
    else
      @products = Product.all
    end
  end

  # GET /products/1
  # GET /products/1.json
  def show
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  #POST /products/destroy_selected
  def destroy_selected
    params[:selected].each do |product_id|
      Product.find(product_id).destroy
    end
    render :layout => false
  end

    #POST /products/activate_selected
  def activate_selected
    params[:selected].each do |product_id|
      product = Product.find(product_id)
      product.active = true
      product.save
    end
    render :layout => false
  end

    #POST /products/deactivate_selected
  def deactivate_selected
    params[:selected].each do |product_id|
      product = Product.find(product_id)
      product.active = false
      product.save
    end
    render :layout => false
  end

  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)
    @product.name = @product.name.strip if @product.name
    respond_to do |format|
      if @product.save
        format.html { redirect_to products_url, notice: 'Product was successfully created.' }
        format.json { render action: 'show', status: :created, location: @product }
      else
        format.html { render action: 'new' }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      @product.name = @product.name.strip if @product.name
      if @product.update(product_params)
        format.html { redirect_to products_url, notice: 'Product was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    def set_categories
      @categories = Category.all
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:name, :price, :active, :category_id)
    end
end
