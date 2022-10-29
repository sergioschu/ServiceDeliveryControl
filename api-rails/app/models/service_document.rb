class ServiceDocument < ApplicationRecord
    belongs_to :prestador, foreign_key: 'user_id', class_name: 'User'
    belongs_to :tomador, foreign_key: 'tomador_id', class_name: 'User'
end
