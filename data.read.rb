require 'fileutils'
require 'date'
require 'yaml'

f = File.new ('./rows_june.formatted.json')

content = YAML.load( f )
buffer = ""

content.each do | v |
  buffer += "Violation.create(date: DateTime.parse('#{v[0]}'), lat: #{v[1]}, lng: #{v[2]}, description: \"#{v[3]}\", fine: #{v[4]})\n"
end
f.close

doc = File.new('./seeds.rb', 'w+')
doc.write buffer
doc.close