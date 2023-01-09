import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons";

it('SignIn with wrong account', () => {
    const dummyAccount = {
        email: 'test@gmail.com',
        password: 'password',
      }
    expect(handleConnect(dummyAccount)).toBe(false);
});
it('SignIn with good account', () => {
    const goodAccount = {
        email: 'leoferte@gmail.com',
        password: 'Ferte',
      }
    expect(handleConnect(goodAccount)).toBe(true);
});