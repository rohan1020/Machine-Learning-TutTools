class HomeController < ApplicationController
  def index
  end

  def gradDesc

  	x = ActiveSupport::JSON.decode(params['q'])


  	samples = x['rawTrainingData']['samples']

  	f = open("/Users/rohanraja/Dropbox/Machine Learning/AndrewNg/mlclass-ex2-005/mlclass-ex2/data.csv", "w")

  	line = ""

  	samples.each do |s|
  		inp = s['inputVector']
  		line = line + inp[0].to_s + "," + inp[1].to_s + "," + s['outputVal'].to_s + "\n"

  	end

  	f.write(line)

  	f.close


  	out2 = `/usr/local/octave/3.8.0/bin/octave -q '/Users/rohanraja/Dropbox/Machine Learning/AndrewNg/mlclass-ex2-005/mlclass-ex2/wrapper.m'`

  	finalTheta = ActiveSupport::JSON.decode(out2)

  	out = {:finalTheta => finalTheta}

  	render :json => out.to_json
  end
end
