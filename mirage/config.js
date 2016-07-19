import Mirage from 'ember-cli-mirage';

export default function() {

    function formEncodedToJson(encoded) {
        var result = {};
        encoded.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

  // These comments are here to help you get started. Feel free to delete them.
    this.post('/token', (schema, request) => {
        console.debug(request.requestBody);
        let params = formEncodedToJson(request.requestBody);
        if (params.username === "admin" && params.password === "admin") {
            return {
                "access_token": "PA$$WORD",
                "token_type": "bearer"
            };
        } else {
            return new Mirage.Response(401, {}, { errors: 'Username or password is invalid' });
        }
    });

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
    this.get('/users/:id', ({ users }, request) => {
        return users.create({id: request.params.id, username: 'Melon Cocoo'});
    });
}
