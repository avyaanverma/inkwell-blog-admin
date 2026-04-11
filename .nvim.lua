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

-- Save with Ctrl+S
vim.keymap.set({ "n", "i", "v" }, "<C-s>", function()
  vim.cmd("write")
end, { desc = "Save file" })

-- Simple rafce snippet (type `rafce` then press Tab to expand)
_G.rafce_snippet = function()
  local name = vim.fn.expand("%:t:r")
  if name == nil or name == "" then
    name = "Component"
  end
  return table.concat({
    "import React from \"react\";",
    "",
    "const " .. name .. " = () => {",
    "  return (",
    "    <div>" .. name .. "</div>",
    "  );",
    "};",
    "",
    "export default " .. name .. ";",
  }, "\n")
end

_G.rafce_or_tab = function()
  local row, col = unpack(vim.api.nvim_win_get_cursor(0))
  local line = vim.api.nvim_get_current_line()
  local before = line:sub(1, col)
  if before:sub(-5) == "rafce" then
    local snippet = _G.rafce_snippet()
    local lines = vim.split(snippet, "\n", { plain = true })
    vim.api.nvim_buf_set_text(0, row - 1, col - 5, row - 1, col, lines)
    local last = lines[#lines] or ""
    vim.api.nvim_win_set_cursor(0, { row - 1 + #lines, #last })
    return ""
  end
  return "\t"
end

vim.keymap.set("i", "<Tab>", "v:lua.rafce_or_tab()", { expr = true, silent = true })
