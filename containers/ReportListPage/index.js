import { connect } from 'react-redux';
import {
	downloadReports,
	resetMeta,
	reset
} from '../../actions/ReportListPage';
import ReportListPage from './ReportListPage';

const mapsStateToProps = state => ({
	pageProps: state.reportPageReducer
});

const mapsDispatchToProps = dispatch => ({
	downloadReports: type => dispatch(downloadReports(type)),
	reset: () => dispatch(reset()),
	resetMeta: () => dispatch(resetMeta())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
) (ReportListPage);
