const { inject } = require('../src/index');

const simpleList = `
<ul>
  <li id="l1" class="li one">1</li>
  <li id="l2" class="li two">2</li>
  <li id="l3" class="li three">3</li>
</ul>
`;

describe('target: After | Before | Append', () => {
  describe('target.<mode>: string', () => {
    describe('id', () => {
      beforeEach(() => (document.body.innerHTML = simpleList));

      test('after', () => {
        const node = document.createElement('a');
        inject(node, { after: '#l2' });
        expect(document.querySelector('#l2').nextSibling).toBe(node);
      });

      test('before', () => {
        const node = document.createElement('a');
        inject(node, { before: '#l2' });
        expect(document.getElementById('l2').previousSibling).toBe(node);
      });

      test('append', () => {
        const node = document.createElement('a');
        inject(node, { append: '#l2' });
        expect(document.querySelector('#l2').lastChild).toBe(node);
      });
    });

    describe('class', () => {
      beforeEach(() => (document.body.innerHTML = simpleList));

      test('after', () => {
        const node = document.createElement('a');
        inject(node, { after: '.li' });
        expect(document.querySelector('.one').nextSibling).toBe(node);
      });

      test('before', () => {
        const node = document.createElement('a');
        inject(node, { before: '.li' });
        expect(document.querySelector('.one').previousSibling).toBe(node);
      });

      test('append', () => {
        const node = document.createElement('a');
        inject(node, { append: '.two' });
        expect(document.querySelector('.two').lastChild).toBe(node);
      });
    });
  });

  describe('target.<mode>: Element', () => {
    describe('id', () => {
      beforeEach(() => (document.body.innerHTML = simpleList));

      test('after', () => {
        const target = document.querySelector('#l2');
        const node = document.createElement('a');
        inject(node, { after: target });
        expect(target.nextSibling).toBe(node);
      });

      test('before', () => {
        const target = document.querySelector('#l2');
        const node = document.createElement('a');
        inject(node, { before: target });
        expect(target.previousSibling).toBe(node);
      });

      test('append', () => {
        const target = document.querySelector('#l2');
        const node = document.createElement('a');
        inject(node, { append: target });
        expect(target.lastChild).toBe(node);
      });
    });

    describe('class', () => {
      beforeEach(() => (document.body.innerHTML = simpleList));

      test('after', () => {
        const node = document.createElement('a');
        inject(node, { after: '.li' });
        expect(document.querySelector('.one').nextSibling).toBe(node);
      });

      test('before', () => {
        const node = document.createElement('a');
        inject(node, { before: '.li' });
        expect(document.querySelector('.one').previousSibling).toBe(node);
      });

      test('append', () => {
        const node = document.createElement('a');
        inject(node, { append: '.two' });
        expect(document.querySelector('.two').lastChild).toBe(node);
      });
    });
  });
});

test('target: Element', () => {
  document.body.innerHTML = simpleList;
  const target = document.querySelector('#l1');
  const node = document.createElement('a');

  inject(node, target);
  expect(target.lastChild).toBe(node);
});

describe('target: string', () => {
  beforeEach(() => (document.body.innerHTML = simpleList));

  test('id', () => {
    const node = document.createElement('a');
    inject(node, '#l2');
    expect(document.querySelector('#l2').lastChild).toBe(node);
  });

  test('class', () => {
    const node = document.createElement('a');
    inject(node, '.two');
    expect(document.querySelector('#l2').lastChild).toBe(node);
  });
});

test('omit target', () => {
  document.body.innerHTML = simpleList;
  const node = document.createElement('a');
  inject(node);
  expect(document.body.lastChild).toBe(node);
});

test('destroy', () => {
  document.body.innerHTML = simpleList;
  const target = document.querySelector('#l2');
  const node = document.createElement('a');

  const { destroy } = inject(node, '#l2');
  expect(target.lastChild).toBe(node);
  destroy();
  expect(document.body.innerHTML).toEqual(simpleList);
});
