import React from 'react';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

export default class PopoverTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <Button id="Popover1" outline color="info" size="sm" onClick={this.toggle}>
          <i className="fa fa-question-circle fa-lg" />
        </Button>
        <Popover placement="right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverContent>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverContent>
        </Popover>
      </div>
    );
  }
}