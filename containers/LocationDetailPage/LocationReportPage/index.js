import { connect } from 'react-redux';
import {
	downloadLocationReports,
	resetMeta,
	reset
} from '../../../actions/LocationDetailPage/LocationReportPage';
import LocationReportPage from './LocationReportPage';

const mapsStateToProps = state => ({ 
	locationReportPageProps: state.locationDetailPage.locationReportPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	downloadReports: type => dispatch(downloadLocationReports(type)),
	reset: () => dispatch(reset()),
	resetMeta: () => dispatch(resetMeta())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationReportPage);
