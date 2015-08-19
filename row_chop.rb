require 'fileutils'
require 'date'
require 'yaml'

f = File.new('./rows_june.json')

fo = YAML.load( f )

p = File.new('./rows_june.formatted.json', 'w+')

p.write fo.map { |v| [v[8], v[14], v[15], v[16]] }.reject{ |v| v[1].nil? }.map { | v |
  y = v[1]
  x = y[1..y.length-2].split(",")
  [ v[0], x[0], x[1], v[2], v[3] ]
}

p.close