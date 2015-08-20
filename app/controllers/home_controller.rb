class HomeController < ApplicationController
  def index
    
      load_day()
   
      @day_sorted = @day_unsorted.order(date: :asc)
      gon.violations = @day_sorted
      
      gon.cordinates = []

      @day_sorted.each do |v|
        gon.cordinates.push({lat: v[:lat], lng: v[:lng], description: v[:description], fine: v[:fine]})
      end

      @fines = []
      @day_sorted.each do |v|
        @fines.push(v[:fine])
      end

      puts @fines.inject{|sum, x| sum + x}

  end

  def load_day
    @day = '%02i' % params[:day] unless params[:day].nil?
      @day ||= 1
    @day_unsorted = Violation.where(date: DateTime.new(2015,06,@day.to_i,00,00,00)..DateTime.new(2015,06,@day.to_i,23,59,59,59) )
  end

  def get_day
    index()
    render 'index'
  end
end
