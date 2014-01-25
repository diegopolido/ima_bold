class Product < ActiveRecord::Base
  belongs_to :category
  validates :name, :price, :category_id, presence: true
  validates :name, length: { maximum: 30}
end
