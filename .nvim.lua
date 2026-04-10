-- Project-local Neovim config for inkwell-blog-admin
-- Requires `set exrc` in your user init to load this file.

vim.opt.expandtab = true
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.softtabstop = 2
vim.opt.smartindent = true

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.signcolumn = "yes"
vim.opt.wrap = false
vim.opt.termguicolors = true

vim.opt.updatetime = 250
vim.opt.timeoutlen = 400

vim.opt.clipboard = "unnamedplus"
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Useful keymaps (safe if LSP/plugins are not installed)
vim.keymap.set("n", "<leader>lf", function()
  if vim.lsp and vim.lsp.buf and vim.lsp.buf.format then
    vim.lsp.buf.format({ async = true })
  else
    vim.cmd("normal! gg=G")
  end
end, { desc = "Format buffer" })

vim.keymap.set("n", "<leader>li", function()
  if vim.lsp and vim.lsp.buf and vim.lsp.buf.hover then
    vim.lsp.buf.hover()
  else
    vim.cmd("help")
  end
end, { desc = "LSP hover/help" })

vim.keymap.set("n", "<leader>lr", function()
  if vim.lsp and vim.lsp.buf and vim.lsp.buf.rename then
    vim.lsp.buf.rename()
  end
end, { desc = "LSP rename" })
