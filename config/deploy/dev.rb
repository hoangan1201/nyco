set :stage, :dev

set :branch, 'master'
set :deploy_to, '/var/www/dev.sir.bbox.ly'
set :rails_env, :dev

# 52.73.230.141 is ec2 micro dev.sir.bbox.ly
role :app, %w{100.26.145.114:837}
role :web, %w{100.26.145.114:837}
role :db,  %w{100.26.145.114:837}

server '100.26.145.114:837', user: 'deploy', roles: %w{web app db}, port: 837, branch: 'master'
