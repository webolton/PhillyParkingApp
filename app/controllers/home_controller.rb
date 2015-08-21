class HomeController < ApplicationController
  def index

# Get variables to pass into JS
# =================================================================================== 
    load_day()

    @day_sorted = @day_unsorted.order(date: :asc)
    gon.violations = @day_sorted
    
    gon.cordinates = []

    @day_sorted.each do |v|
      gon.cordinates.push({lat: v[:lat], lng: v[:lng], description: v[:description], fine: v[:fine]})
    end

# Total amount of fines
# ===================================================================================
    @fines = []
    @day_sorted.each do |v|
      @fines.push(v[:fine])
    end
    @fines_total = @fines.inject{|sum, x| sum + x}.to_s

# Most expensive ticket
# ===================================================================================
    @biggest_fine =  @fines.max

#Average fine for day
# ===================================================================================
    @total = @fines.inject(:+)
    @leng = @fines.length
    @average = @total.to_f / @leng

# Most common ticket type
# ===================================================================================
    @descriptions = []

    @day_sorted.each do |v|
      @descriptions.push(v[:description])
    end

    def most_common_value(a)
      a.group_by(&:itself).values.max_by(&:size).first
    end

    @most_common_ticket = most_common_value(@descriptions)
  end

# Pass params data to controller
# ===================================================================================
  def load_day

    @day = '%02i' % params[:day] unless params[:day].nil?
      @day ||= 1

    @day_unsorted = Violation.where(date: DateTime.new(2015,06,@day.to_i,00,00,00)..DateTime.new(2015,06,@day.to_i,23,59,59,59) )
  end

# Post method for getting data
# ===================================================================================
  def get_day
    index()
    render 'index'
  end

  def about
  end
end
