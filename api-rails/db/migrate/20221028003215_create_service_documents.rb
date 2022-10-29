class CreateServiceDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :service_documents do |t|

      t.timestamps
    end
  end
end
