# Loadtester
A simple loadtester for a POST endpoint

To install: `npm install`

To run it: `node loadtest.js endpoint=http://my.post.endpoint.com`

You can add optional parameters to your request too:
| Argument | Description | Example | Default |
| requestbody | The name of a file containing a function that returns your post request | postBody | function(){return {}} | 
| timeout | A duration (in milliseconds) to wait between the batches of requests | 1000 | 500 |
| totalruns | The number of total runs against your endpoint | 10000 | 5000 |
| concurrent | The number of requests to send at once | 100 | 50 | 

For example you might want to run:
`node loadtest.js endpoint=http://my.endpoint.com/post requestbody=postbody timeout=1000 totalruns=10000 concurrent=100`
