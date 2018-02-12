import React from 'react';

class Dropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleVisibility   = this.handleVisibility.bind(this);
        this.handleSelect       = this.handleSelect.bind(this);
        this.setWrapperRef      = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            is_list_visible: false,
            value          : this.props.value,
            selected       : this.props.selected || this.props.value,

        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleSelect(item) {
        if (item.value) {
            if (item.value !== this.state.value) {
                this.setState({ selected: item.name, value: item.value });
                this.props.onChange({ target: { name: this.props.name, value: item.value } });
            }
        }
        else {
            this.setState({ selected: item, value: item });
            this.props.onChange({ target: { name: this.props.name, value: item } });
        }
        this.handleVisibility();
    }

    setWrapperRef(node) {
        this.wrapper_ref = node;
    }

    scrollToggle(state) {
        this.is_open = state;
        document.body.classList.toggle('no-scroll', this.is_open);
    }

    handleClickOutside(event) {
        if (this.wrapper_ref && !this.wrapper_ref.contains(event.target) && this.state.is_list_visible) {
            this.setState({ is_list_visible: false });
            this.scrollToggle(this.state.is_list_visible);
        }
    }

    handleVisibility() {
        this.setState({ is_list_visible: !this.state.is_list_visible });
        this.scrollToggle(!this.state.is_list_visible);
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className={`dropdown-container ${this.props.className ? this.props.className : ''} ${this.state.is_list_visible ? 'show' : ''}`}>
                <div
                    className={`dropdown-display ${this.state.is_list_visible ? 'clicked': ''}`}
                    onClick={this.handleVisibility}
                    onBlur={this.handleVisibility}
                >
                    <span name={this.props.name} value={this.state.value}>{this.state.selected}</span>
                </div>
                <span className='select-arrow' />
                <div className='dropdown-list'>
                    <div className='list-container'>
                    { Array.isArray(this.props.list) ?
                        <Items
                            items={this.props.list}
                            name={this.props.name}
                            value={this.state.value}
                            handleSelect={this.handleSelect}
                            type={this.props.type || undefined}
                        /> :
                        Object.keys(this.props.list).map(key => (
                            <React.Fragment key={key}>
                                <div className='list-label'><span>{key}</span></div>
                                <Items
                                    items={this.props.list[key]}
                                    name={this.props.name}
                                    value={this.state.value}
                                    handleSelect={this.handleSelect}
                                />
                            </React.Fragment>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
}

const Items = ({
    items,
    name,
    value,
    handleSelect,
    type,
}) => (
    items.map((item, idx) => (
        <React.Fragment key={idx}>
            {item.name && item.value ?
                <div
                    className={`list-item ${ value === item.value ? 'selected' : ''}`}
                    key={idx}
                    name={name}
                    value={item.value}
                    data-end={type==='date' && item.end ? item.end : undefined}
                    onClick={handleSelect.bind(null, item)}
                >
                    <span>{item.name}</span>
                </div>
            :
                <div
                    className={`list-item ${ value === item ? 'selected' : ''}`}
                    key={idx}
                    name={name}
                    value={item}
                    onClick={handleSelect.bind(null, item)}
                >
                    <span>{item}</span>
                </div>
        }
        </React.Fragment>
    ))
);

export default Dropdown;
