# SuGet

Simple script that takes in a list of url paths and outputs their HTTP response codes.

## Setup

Create `config.yml`.

Example `config.yml`:

```yaml
site:
  auth: 'USERNAME:PASSWORD' # simple HTTP auth
  root: 'example.com' # url root
```

## Run

`node index.js --file=<filename>`

Pipe output to CSV file:

`node index.js --file list.txt > output.csv`
