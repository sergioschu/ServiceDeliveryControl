class User < ApplicationRecord

    has_many :service_document

    validates :name, presence: true
    validates :email, presence: true
    validates :password_digest, presence: true
end
