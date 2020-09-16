// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        posts: [], // See initialization.
        show_new_post: false,
        author_name,
        user_email,
    };

    app.index = (a) => {
        // Adds to the posts all the fields on which the UI relies.
        let i = 0;
        for (let p of a) {
            p._idx = i++;
            // TODO: Only make the user's own posts editable.
            p.editable = true;
            p.edit = false;
            p.is_pending = false;
            p.error = false;
        }
        return a;
    };

    app.reindex = () => {
        // Adds to the posts all the fields on which the UI relies.
        let i = 0;
        for (let p of app.vue.posts) {
            p._idx = i++;
        }
    };

    app.do_edit = (post_idx) => {
        app.vue.posts.forEach((post) => (post.edit = false));
        app.vue.show_new_post = false;
        let p = app.vue.posts[post_idx];
        p.edit = true;
        p.is_pending = false;
    };

    app.do_cancel = (post_idx) => {
        let p = app.vue.posts[post_idx];
        p.edit = false;
    }

    app.do_save = (post_idx) => {
        // Handler for "Save edit" button.
        let p = app.vue.posts[post_idx];
        p.is_pending = true;
        axios.post(posts_url, {
            id: p.id,
            title: p.title,
        }).then((result) => {
            console.log("Received:", result.data);
            p.edit = false;
        }).catch((e) => {
            p.is_pending = false;
            console.log(e);
            // We stay in edit mode.
        });
        app.reindex();
    }

    app.fetch_posts = () => {
        axios
        .get(posts_url)
        .then((result) => {
            app.vue.posts = app.index(result.data.posts);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    app.create = () => {
        app.vue.posts.push (new post());
        app.reindex();
        console.log("create");
    };

    app.add_post = () => {
        console.log("create");
        let q = {
            id: null,
            edit: null,
            editable: null,
            title: " ",
            author: null,
            email: null,
        };
        axios
            .post(posts_url,{
                id: null,
                title: "New Note",
            })
            .then((result) => {
                q = {
                    ...q,
                    id: result.data.id,
                    editable: true,
                    title: result.data.title,
                    author: author_name,
                    email: user_email,
                };
                app.vue.posts = [q, ...app.vue.posts];
                app.reindex();
            })
            .catch((e) => {
                console.log(e);
            });
        app.reindex();
    };

    app.do_delete = (post_idx) => {
        let p = app.vue.posts[post_idx];
        axios
            .post(delete_url, {
                id: p.id,
            })
            .then(() => {
                app.vue.posts.splice(post_idx, 1);
            })
            .catch((e) => {
                console.log (e);
            });
        app.reindex();
    };

    // We form the dictionary of all methods, so we can assign them
    // to the Vue app in a single blow.
    app.methods = {
        do_edit: app.do_edit,
        do_cancel: app.do_cancel,
        do_save: app.do_save,
        create: app.create,
        add_post: app.add_post,
        do_delete: app.do_delete,
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        app.fetch_posts();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
