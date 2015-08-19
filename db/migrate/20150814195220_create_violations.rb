class CreateViolations < ActiveRecord::Migration
  def change
    create_table :violations do |t|
      t.datetime :date
      t.float :lat
      t.float :lng
      t.string :description
      t.float :fine

      t.timestamps null: false
    end
  end
end
