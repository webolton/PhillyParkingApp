class HomeController < ApplicationController
  def index
    # @violations = Violation.all
    @first_of_june_unordered = Violation.where(date: DateTime.new(2015,06,01,00,00,00)..DateTime.new(2015,06,01,23,59,59,59) )
    
    @first_of_june = @first_of_june_unordered.order(date: :asc);

    gon.violations = @first_of_june
    
    gon.cordinates = []

    @first_of_june.each do |v|
      gon.cordinates.push({lat: v[:lat], lng: v[:lng], description: v[:description], fine: v[:fine]})
    end

    @fines = []
    @first_of_june.each do |v|
      @fines.push(v[:fine])
    end
    puts @fines.inject{|sum, x| sum + x}
  end
end
