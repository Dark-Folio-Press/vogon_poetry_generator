let fullPoem = '';

    function setSubject(text) {
      document.getElementById('subject').value = text;
      document.getElementById('subject').focus();
    }

    document.getElementById('subject').addEventListener('keydown', e => {
      if (e.key === 'Enter') generatePoem();
    });

    async function generatePoem() {
      const subject = document.getElementById('subject').value.trim();
      if (!subject) {
        document.getElementById('subject').focus();
        return;
      }

      const severity = Number(document.getElementById('severity').value);

      const btn = document.getElementById('generate-btn');
      const card = document.getElementById('output-card');
      const poemEl = document.getElementById('poem-text');
      const dot = document.getElementById('pulsedot');
      const statusLabel = document.getElementById('status-label');
      const copyBtn = document.getElementById('copy-btn');

      btn.disabled = true;
      fullPoem = '';
      card.classList.add('visible');
      poemEl.innerHTML = '<span class="cursor"></span>';
      dot.className = 'pulsedot';
      statusLabel.textContent = 'Composing…';
      copyBtn.classList.add('hidden');

      try {
        const res = await fetch('/poem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            severity
          })
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') {
              dot.className = 'pulsedot done';
              statusLabel.textContent = 'Verse complete';
              copyBtn.classList.remove('hidden');
              poemEl.innerHTML = escapeHtml(fullPoem);
              break;
            }

            try {
              const data = JSON.parse(payload);

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.score !== undefined) {
                statusLabel.textContent = `Vogon Severity Index: ${data.score}/10 — ${data.classification}`;
              }

              fullPoem += data.text || '';
              poemEl.innerHTML = escapeHtml(fullPoem) + '<span class="cursor"></span>';
              poemEl.scrollTop = poemEl.scrollHeight;
            } catch (e) {
              // ignore non-JSON or empty lines
            }
          }
        }
      } catch (err) {
        poemEl.innerHTML = '';
        const errEl = document.createElement('div');
        errEl.className = 'error-msg';
        errEl.textContent = 'Transmission failure: ' + err.message;
        poemEl.appendChild(errEl);
        dot.className = 'pulsedot';
        dot.style.background = '#e07070';
        statusLabel.textContent = 'Error';
      }

      btn.disabled = false;
    }

    async function copyPoem() {
      await navigator.clipboard.writeText(fullPoem);
      const btn = document.getElementById('copy-btn');
      btn.textContent = 'Copied';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    }