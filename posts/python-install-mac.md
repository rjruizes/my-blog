---
date: "2020-08-05"
title: Python Installation on Mac
---

<!-- Excerpt Start -->
On Mac, use Homebrew to install Python 3, then use pipenv to manage individual project dependencies.
<!-- Excerpt End -->

```bash
brew install python3
```

Add aliases to ~/.zshrc file:

``` bash
alias python=python3
alias pip=pip3
```

Test that Python 3.x and pip are working:

``` bash
python --version
pip --version
```

Check what packages are installed globally with pip:

``` bash
pip list

Package    Version
---------- -------
pip        20.1.1
setuptools 49.2.0
wheel      0.34.2
```

Install pipenv, the per-project package manager:

``` bash
pip install --user pipenv
```

which gave me a warning

``` bash
WARNING: The scripts pipenv and pipenv-resolver are installed in '/Users/rr214/Library/Python/3.8/bin' which is not on PATH.
```

so I added the directory to my path:

``` bash
export PATH=$PATH:/Users/rr214/Library/Python/3.8/bin
```

### Create a project

``` bash
mkdir my-demo
cd my-demo
pipenv install requests
```

Now we have a pipenv with our first dependency, requests.

Create a little test script, main.py:

``` python
import requests

response = requests.get('https://httpbin.org/ip')

print('Your IP is {0}'.format(response.json()['origin']))
```

And run:

``` bash
pipenv run python main.py
```
