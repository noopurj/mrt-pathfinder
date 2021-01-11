import {getPath} from "../getPath";

describe('getPath', () => {
    const STATIONS = {
        'Admiralty': {'NS': 10},
        'Aljunied': {'EW': 9},
        'Ang Mo Kio': {'NS': 16},
    };

    it('can return empty path if origin and destination is the same', () => {
        const sameStation = 'Admiralty';
        expect(getPath(sameStation, sameStation, STATIONS)).toEqual([]);
    });

    it('can throw exception if destination or origin is invalid', () => {
        expect(() => getPath('Invalid Station', 'Invalid Station', STATIONS)).toThrowError(
            'Invalid station, cannot calculate path'
        );
    });

    it('can return a single path between two stations on the same line', () => {
        expect(getPath('Admiralty', 'Ang Mo Kio', STATIONS))
            .toEqual([['Admiralty', 'Ang Mo Kio']]);
    })
});