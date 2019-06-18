# Linux OS curl to download + install Stackery
curl -Ls --compressed https://ga.cli.stackery.io/linux/stackery > /tmp/stackery
sudo -i chmod a+x /tmp/stackery

stackery=/tmp/stackery
branch=$TRAVIS_BRANCH
repo=$TRAVIS_REPO_SLUG
repo=${repo#*/} # Remove 'github-owner/' from the string to retrieve 'repo-name'


case branch in
    develop)
        env="travisci-develop"
        AWS_ACCESS_KEY_ID = $AWS_ACCESS_KEY_DEV
        AWS_SECRET_ACCESS_KEY = $AWS_SECRET_ACCESS_DEV
        ;;
    staging)
        env="travisci-staging"
        AWS_ACCESS_KEY_ID = $AWS_ACCESS_KEY_DEV
        AWS_SECRET_ACCESS_KEY = $AWS_SECRET_ACCESS_DEV
        ;;
    master)
        env="travisci"
        AWS_ACCESS_KEY_ID = $AWS_ACCESS_KEY_DEV
        AWS_SECRET_ACCESS_KEY = $AWS_SECRET_ACCESS_DEV
        ;;
esac

# Set '$env' to 'prod' or branch name
# if [[ "$branch" == "master" ]] && env="travisci" || env="$branch"

# Log in to Stackery using email and password stored in Travis CI
$stackery login --email $STACKERY_EMAIL --password $STACKERY_PASSWORD --non-interactive

# Deploy to Stackery using AWS access and secret keys

echo "Deploying stack $repo to environment $env using git branch $branch"
echo "repo = $repo"
$stackery deploy -n $repo -e $env -r $branch --access-key-id AWS_ACCESS_KEY_ID --secret-access-key AWS_SECRET_ACCESS_KEY --non-interactive