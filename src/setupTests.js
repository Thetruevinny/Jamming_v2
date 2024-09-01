// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Track from '../Components/Track';

const song = {
    id: 1,
    song: 'Waka Waka',
    artist: 'Shakira',
    album: 'Sol de Sol'
};

describe('<Track /> ', () => {
    it('Contains Artist Name', () => {
        const wrapper = mount(<Track song={song.song} artist={song.artist} album={song.album} id={song.id} type='results' />)
        const value = wrapper.find('p').text() 
        expect(value).toEqual('Waka Waka');    
    });

    it('Accepts User Props', () => {
        const wrapper = mount(<Track song={song.song} artist={song.artist} album={song.album} id={song.id} type='results' />)
        expect(wrapper.props().song).toEqual(song.song);
    }); 
});
