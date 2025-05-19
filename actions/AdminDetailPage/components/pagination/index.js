import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Dropdown, Input } from 'semantic-ui-react';
import './index.scss';

export class Pagination extends Component {
	state = {
		page: 1
	};

	parseToInt(input, defaultValue) {
		if (_.isNil(input)) {
			return defaultValue;
		}
		if (_.isInteger(input)) {
			return input;
		}
		if (_.isString(input)) {
			try {
				return _.toInteger(input);
			} catch (e) {

			}
		}
		return defaultValue;
	}

	onClickPrev = (e, obj) => {
		const { page, limit } = this.props;
		const pageInt = this.parseToInt(page, 1);
		const limitInt = this.parseToInt(limit, 20);
		this.props.onPageChange(pageInt - 1, limitInt);
	};

	onClickNext = (e, obj) => {
		const { page, limit } = this.props;
		const pageInt = this.parseToInt(page, 1);
		const limitInt = this.parseToInt(limit, 1);
		this.props.onPageChange(pageInt + 1, limitInt);
	};

	onItemsPerPageChange = (e, obj) => {
		if (this.props.onItemsPerPageChange) {
			this.props.onItemsPerPageChange(obj.value);
		}
	};

	getDropdownOptions(options) {
		return options.map(elem => {
			return {
				key: `${elem}`,
				text: `${elem}`,
				value: elem
			};
		});
	}

	componentDidMount() {
		this.setState({
			page: this.props.page
		});
	}

	onKeyPress = e => {
		if (e.key === 'Enter') {
			if (_.isInteger(this.state.page)) {
				this.props.onPageChange(this.state.page, this.props.limit);
			}
		}
	}

	onFieldChange = (e, data) => {
		const newValue = data.value.replace(/[^0-9]/g, '');
		if (!newValue || this.parseToInt(newValue, 1) < 1) {
			this.setState({
				page: ''
			});
			return;
		}
		this.setState({
			page: this.parseToInt(data.value, 1)
		});
	}

	render() {
		const { limit, page, total, options } = this.props;
		const limitInt = this.parseToInt(limit, 20);
		const pageInt = this.parseToInt(page, 1);
		const disablePrev = pageInt <= 1;
		const disableNext = pageInt * limitInt >= total;
		const firstRowOfPage = 1 + (pageInt - 1) * limitInt;
		const lastRowOfPage = firstRowOfPage - 1 + limitInt;
		const dropdownOptions = this.getDropdownOptions(options);

		return (
			<div className="pagination-style">
				<span>Records per page </span>
				<Dropdown
					options={dropdownOptions}
					value={limit}
					onChange={this.onItemsPerPageChange}
				/>
				<span>
					{firstRowOfPage}-{lastRowOfPage > total ? total : lastRowOfPage} of {total}
				</span>
				<Button
					icon
					disabled={disablePrev}
					onClick={this.onClickPrev}
				>
					<Icon name="angle left" />
				</Button>
				<Input
					style={{ marginLeft: '0.25em', marginRight: '0.25em', width: 60, textAlign: 'center' }}
					value={this.state.page}
					onKeyPress={this.onKeyPress}
					onChange={this.onFieldChange}
				/>
				<Button
					icon
					disabled={disableNext}
					onClick={this.onClickNext}
				>
					<Icon name="angle right" />
				</Button>
			</div>
		);
	}
}

Pagination.propTypes = {
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onPageChange: PropTypes.func
};

Pagination.defaultProps = {
	total: 0,
	page: 1,
	limit: 20
};

export default Pagination;
