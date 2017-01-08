export default {
  locale: 'en',
  messages: {
    siteTitle: 'Home',
    auth: {
      loginTitle: '請登入',
      registrationTitle: '註冊',
      signIn: '登入',
      signOut: '登出',
      signUp: '註冊',
    },
    all: '全部',
    header: {
      helloMessage: '{name} 你好',
    },
    searchCondition: '搜尋條件',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    addPost: 'Add Post',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deletePost: 'Delete Post',
    createNewPost: 'Create new post',
    authorName: 'Author\'s Name',
    posts: '文章',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
