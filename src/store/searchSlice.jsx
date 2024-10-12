import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchInfo: {
            startDate: "",
            endDate: "",
            onlyMainRole: false,
            onlyWithRiskFactors: false,
            tonality: "",
            inn: "",
            maxFullness: false,
            inBusinessNews: false,
            limit: null,
            isTechNews: "",
            isAnnouncement: "",
            isDigest: "",
        }
    },
    reducers: {
        addSearchInfo(state, action) {
            state.searchInfo.startDate = action.payload.startDate;
            state.searchInfo.endDate = action.payload.endDate;
            state.searchInfo.onlyMainRole = action.payload.onlyMainRole;
            state.searchInfo.onlyWithRiskFactors = action.payload.onlyWithRiskFactors;
            state.searchInfo.tonality = action.payload.tonality;
            state.searchInfo.inn = action.payload.inn;
            state.searchInfo.maxFullness = action.payload.maxFullness;
            state.searchInfo.inBusinessNews = action.payload.inBusinessNews;
            state.searchInfo.limit = action.payload.limit;
            state.searchInfo.isTechNews = action.payload.isTechNews;
            state.searchInfo.isAnnouncement = action.payload.isAnnouncement;
            state.searchInfo.isDigest = action.payload.isDigest;
        }
    }
});

export const { addSearchInfo } = searchSlice.actions;
export default searchSlice.reducer;