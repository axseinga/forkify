import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateBtnMarkup(page, direction, arrow) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
      <span>${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
    </button>
`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const next = 'next';
    const prev = 'prev';
    const left = 'left';
    const right = 'right';
    const nextPage = curPage + 1;
    const prevPage = curPage - 1;
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateBtnMarkup(nextPage, next, right);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateBtnMarkup(prevPage, prev, left);
    }
    // Other page
    if (curPage < numPages) {
      const prevBtn = this._generateBtnMarkup(prevPage, prev, left);
      const nextBtn = this._generateBtnMarkup(nextPage, next, right);
      return [prevBtn, nextBtn];
    }
    // Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
