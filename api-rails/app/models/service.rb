class Service < ApplicationRecord

    validates :name, presence: true
    validates :active, presence: true
end
