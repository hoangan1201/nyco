set :application, 'social-indicators-report'
set :repo_url, "git@bitbucket.org:blenderbox/#{fetch(:application)}.git"
set :scm, :git

##set :deploy_via, :remote_cache
set :format, :pretty
set :forward_agent, true
#set :log_level, :debug
set :pty, true
set :use_sudo, false

set :linked_files, %w{source/settings/secrets.yml}
set :linked_dirs, %w{}

set :default_env, { path: "/usr/local/bin:$PATH" }
set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      case fetch(:stage)
      when :dev
        execute "sudo supervisorctl restart dev.sir.bbox.ly"
      # when :production
      #   execute "sudo supervisorctl restart <production_domain>"
      end
    end
  end

  after :finishing, 'deploy:cleanup'
  after 'deploy:cleanup', 'deploy:restart'
end

namespace :nginx do
  desc "Restart nginx"
  task :restart do
    on roles(:all) do
      execute "sudo service nginx configtest && sudo service nginx restart"
    end
  end
end

namespace :django do

  def django(args, flags="", run_on=:all)
    on roles(run_on) do |h|
      manage_path = File.join(release_path, 'source', 'manage.py')
      execute "#{shared_path}/envs/sir/bin/python #{manage_path} #{args} #{flags}"
    end
  end

  desc "Clear the application's cache"
  task :clear_cache do
    on roles(:all) do
      django("clear_cache")
    end
  end

  desc "Run django's collectstatic"
  task :collectstatic do
    django("collectstatic", "--noinput")
  end

  desc "Run django-compressor"
  task :compress do
    django("compress", "--force")
    invoke 'deploy:restart'
  end

  desc "Migrate changes"
  task :migrate do
    django("migrate")
  end

  desc "Install python libs"
  task :pip_install do
    on roles(:all) do |h|
      requirements_path = File.join(release_path, 'requirements.txt')
      execute "#{shared_path}/envs/<project_name>/bin/pip install -r #{requirements_path}"
    end
  end

  desc 'Setup the django app'
  task :symlink_settings do
    on roles(:all) do
      settings_path = File.join(release_path, 'source', 'settings')
      execute "ln -s #{settings_path}/#{fetch(:stage)}.py #{settings_path}/local.py"
    end
  end

  after 'deploy:symlink:release', 'django:symlink_settings'
  #after 'deploy:symlink:release', 'django:compress'
  after 'deploy:symlink:release', 'django:collectstatic'
  after 'deploy:symlink:release', 'django:clear_cache'
end
