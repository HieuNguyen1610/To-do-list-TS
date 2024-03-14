import React from "react";

interface ContactProps {}

interface ContactState {}

class Contact extends React.Component<ContactProps, ContactState> {
  constructor(props: ContactProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>This is Contact Page</div>;
  }
}

export default Contact;
